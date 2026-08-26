#!/usr/bin/env node
/**
 * Guards the trailing-slash convention against the built export.
 *
 * `next.config.js` sets `trailingSlash: true` *and*
 * `skipTrailingSlashRedirect: true`, and firebase.json sets `trailingSlash:
 * true` on both hosting targets. So `/blog/` is the only shape this site
 * serves, and `/blog` is not broken — it is silently one 301 slower on every
 * click, plus a needless hop for every crawler that follows it. That is exactly
 * the kind of defect no test notices: the page still loads.
 *
 * It has regressed twice. Once across the JSON-LD, breadcrumbs, sitemap and
 * in-post links (1a6a265); once across eleven component `<Link href>` values
 * (PR #10, 4c6194c). Both were caught by eye. This script is the third line of
 * defence, and it runs in CI.
 *
 * ── How a path is classified ──────────────────────────────────────────────
 *
 * The obvious implementation is a regex allowlist of directories that are
 * legitimately slashless (`_next`, `images`, …). That rots: `public/` already
 * holds `audio/`, `textures/` and `.well-known/` that no such list mentions,
 * and the next asset directory someone adds would either be flagged wrongly or
 * quietly excluded along with any real route under it.
 *
 * Instead the export answers the question itself. `output: 'export'` with
 * `trailingSlash: true` writes every page as `out/<path>/index.html`, and
 * firebase.json declares no rewrites and no redirects — so for any internal
 * URL exactly one of three things is true:
 *
 *   out/<path>/index.html exists  → it is a page. It MUST end in '/'.
 *   out/<path> is a file          → it is an asset. It must NOT end in '/'.
 *   neither                       → it is a broken link. Nothing serves it.
 *
 * No allowlist, no extension heuristics, and it stays correct as routes and
 * assets come and go.
 *
 * ── What is checked ───────────────────────────────────────────────────────
 *
 *   1. every `href="…"` in every exported .html  (components, in-post
 *      markdown links, the layout's icon links)
 *   2. every absolute same-origin URL in every exported .html — which covers
 *      `<link rel=canonical>`, `og:url`, `og:image` and all the JSON-LD
 *      `url` / `@id` / `item` / `mainEntityOfPage` values in one pass
 *   3. every `<loc>` in sitemap.xml
 *
 * Cross-origin URLs are skipped: this script cannot know what sakha.live or
 * linkedin.com serve. Fragment-only paths ('/#products') resolve to '/', which
 * is already canonical.
 *
 * Run after `npm run build`. Exits non-zero on any finding.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(repoRoot, 'out');

const findings = [];
const fail = (file, url, msg) => findings.push({ file, url, msg });

if (!existsSync(outDir)) {
  console.error('✖ trailing slashes: out/ not found — this check inspects the built export.');
  console.error('  Build first:  NEXT_PUBLIC_BASE_URL=https://margadeshaka.com npm run build');
  process.exit(1);
}

/** Every file under `dir` whose name ends in `ext`. */
function walk(dir, ext, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, ext, acc);
    else if (entry.name.endsWith(ext)) acc.push(full);
  }
  return acc;
}

const htmlFiles = walk(outDir, '.html');

/**
 * Route paths the export actually serves, in canonical (trailing-slash) form.
 * `out/blog/index.html` → '/blog/'. `out/index.html` → '/'.
 */
const routes = new Set(
  htmlFiles
    .filter((f) => f.endsWith(`${sep}index.html`))
    .map((f) => {
      const dir = relative(outDir, f).slice(0, -'index.html'.length);
      return `/${dir.split(sep).filter(Boolean).join('/')}${dir ? '/' : ''}`.replace('//', '/');
    })
);

if (!routes.has('/')) {
  console.error('✖ trailing slashes: out/index.html is missing — the export looks incomplete.');
  process.exit(1);
}

/**
 * The origin this export was built for. Taken from the home page's own
 * canonical tag rather than from NEXT_PUBLIC_BASE_URL, so the check works the
 * same whoever runs it and whatever their shell happens to have exported.
 */
const homeHtml = readFileSync(join(outDir, 'index.html'), 'utf8');
const canonicalMatch = homeHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
if (!canonicalMatch) {
  console.error('✖ trailing slashes: no <link rel="canonical"> on the home page — cannot resolve the site origin.');
  process.exit(1);
}
const origin = new URL(canonicalMatch[1]).origin;

/** '/blog/?x=1#y' → '/blog/'. Percent-decoded so it can be looked up on disk. */
function pathOf(url) {
  const raw = url.split('#')[0].split('?')[0];
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw; // malformed escape — compare the literal form
  }
}

function isFile(path) {
  const full = join(outDir, path);
  // Keep the lookup inside out/ — a '..' in an href must not escape it.
  if (!full.startsWith(outDir)) return false;
  try {
    return statSync(full).isFile();
  } catch {
    return false;
  }
}

/**
 * Classify one internal path. Returns null when it is fine, or a message.
 */
function check(rawUrl) {
  const path = pathOf(rawUrl);
  if (path === '' || path === '/') return null; // root, or a bare fragment

  if (path.endsWith('/')) {
    // Already canonical. Still worth knowing if nothing serves it.
    return routes.has(path) ? null : `points at ${path} which the export does not serve`;
  }

  if (routes.has(`${path}/`)) {
    return `is a route and must end with a slash — use ${path}/ (see app/lib/routes.ts)`;
  }
  if (isFile(path)) return null; // an asset; correctly slashless

  return `points at ${path} which the export serves as neither a page nor a file`;
}

// ── 1 + 2: every exported HTML page ────────────────────────────────────────
const HREF = /href="(\/[^"]*)"/g;
const ABSOLUTE = new RegExp(`${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/[^"'\\s<>\\\\]*)?`, 'g');

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const where = relative(repoRoot, file);
  const seen = new Set();

  for (const [, href] of html.matchAll(HREF)) {
    if (seen.has(href)) continue;
    seen.add(href);
    const problem = check(href);
    if (problem) fail(where, href, problem);
  }

  for (const [full, path] of html.matchAll(ABSOLUTE)) {
    const key = `abs:${full}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const problem = check(path ?? '/');
    if (problem) fail(where, full, problem);
  }
}

// ── 3: sitemap.xml ─────────────────────────────────────────────────────────
const sitemap = join(outDir, 'sitemap.xml');
if (!existsSync(sitemap)) {
  fail('out/sitemap.xml', '', 'missing — app/sitemap.ts should have exported it');
} else {
  const xml = readFileSync(sitemap, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail('out/sitemap.xml', '', 'contains no <loc> entries');
  for (const loc of locs) {
    if (!loc.startsWith(origin)) {
      fail('out/sitemap.xml', loc, `is not on ${origin} — a sitemap may only list URLs for its own host`);
      continue;
    }
    const problem = check(loc.slice(origin.length) || '/');
    if (problem) fail('out/sitemap.xml', loc, problem);
  }
}

// ── report ─────────────────────────────────────────────────────────────────
if (findings.length) {
  console.error(`✖ trailing slashes: ${findings.length} internal URL${findings.length === 1 ? '' : 's'} to fix\n`);
  const byFile = new Map();
  for (const f of findings) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  for (const [file, list] of byFile) {
    console.error(`  ${file}`);
    for (const f of list) console.error(`    ${f.url || '(sitemap)'} ${f.msg}`);
  }
  console.error(
    '\n  Route paths belong in app/lib/routes.ts (ROUTES / blogPost()). Note that\n' +
      '  the offending source is often NOT a literal in the same shape: Next resolves\n' +
      '  metadata URLs through metadataBase with trailingSlash applied, so a bad\n' +
      '  <Link href> is the usual cause.'
  );
  process.exit(1);
}

console.log(
  `✔ trailing slashes: ${htmlFiles.length} pages, ${routes.size} routes — every internal route URL is canonical`
);
