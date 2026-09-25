#!/usr/bin/env node
/**
 * Guards defence-in-depth layers two and three against the built export.
 *
 * Layer one — the only mechanism that existed before this script — is the
 * `X-Robots-Tag: noindex, nofollow` header scripts/verify-hosting-config.mjs
 * asserts is present on staging and absent on production in firebase.json.
 * That header wins at serve time regardless of what the page itself says,
 * but nothing checked that the page didn't contradict it: app/layout.tsx
 * used to emit `robots: { index: true, follow: true }` unconditionally, and
 * public/robots.txt unconditionally said `Allow: /`, so every staging page
 * carried a <meta name="robots" content="index, follow"> and a crawlable
 * robots.txt underneath the one header holding the line.
 *
 * Layer two is app/layout.tsx's `robots` metadata and app/robots.ts, both
 * driven by app/lib/env.ts's `isStagingBuild()`. This script is layer three:
 * it reads the already-built `out/` directory (building is not its job —
 * that is `npm run build`, same division of labour as
 * verify-trailing-slashes.mjs) and asserts the export practices what layer
 * two preaches, for whichever environment it was actually built as.
 *
 * ── How the script knows which environment out/ was built for ─────────────
 *
 * It does NOT trust `process.env.NEXT_PUBLIC_BASE_URL` at verify time — in
 * CI, `npm run verify:hosting` runs as its own step, after the build step
 * whose `env:` block set that variable, and step-scoped env does not carry
 * over. Trusting it would also defeat the point: this script exists to catch
 * layer two disagreeing with itself, so it must not share a blind spot with
 * the code it is checking. Instead it reads the canonical URL Next already
 * baked into out/index.html — the same signal layer two used — and treats
 * that as ground truth for "which build is this".
 *
 * ── Fail-safe direction ─────────────────────────────────────────────────
 * Same rule as app/lib/env.ts: if this script can't tell what it's looking
 * at (missing files, no canonical link, unrecognised origin), it fails
 * loudly rather than silently passing a build that might be production.
 *
 * ── Scope ───────────────────────────────────────────────────────────────
 * This checks out/index.html and out/robots.txt, not every file under out/.
 * Next.js's own not-found boundary (app/not-found.tsx has no metadata
 * export, so this is Next's built-in behaviour) always injects its own
 * `<meta name="robots" content="noindex">` on the 404 page, in *every*
 * environment, alongside the layout's own robots tag — that's correct SEO
 * practice (don't index 404s) and predates this change; it is not part of
 * the staging/production distinction this script guards, and a literal
 * "no 'noindex' string anywhere under out/" check would fail on production
 * for a reason that has nothing to do with the gap this script exists to
 * catch.
 */
import { existsSync, readFileSync } from 'node:fs';

const OUT_DIR = new URL('../out/', import.meta.url);
const STAGING_ORIGIN = 'https://margadeshaka-staging.web.app';

const fail = (msg) => {
  console.error(`✖ noindex guard: ${msg}`);
  process.exitCode = 1;
};

const indexHtmlUrl = new URL('index.html', OUT_DIR);
const robotsTxtUrl = new URL('robots.txt', OUT_DIR);

if (!existsSync(indexHtmlUrl)) {
  console.error(
    '✖ noindex guard: out/index.html is missing — run `npm run build` first (same requirement as verify-trailing-slashes.mjs).'
  );
  process.exit(1);
}
if (!existsSync(robotsTxtUrl)) {
  fail('out/robots.txt is missing — app/robots.ts should export it as a static route.');
  process.exit(1);
}

const html = readFileSync(indexHtmlUrl, 'utf8');
const robotsTxt = readFileSync(robotsTxtUrl, 'utf8');

// --- which environment was this built as? Read it back out of the export ---
const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
if (!canonicalMatch) {
  fail('out/index.html has no canonical <link> — cannot determine which environment this export was built for.');
  process.exit(1);
}
const canonicalUrl = canonicalMatch[1];
const isStaging = canonicalUrl.startsWith(STAGING_ORIGIN);

// --- what does the page itself say? ---
const robotsMetaContents = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1]);
const pageHasNoindex = robotsMetaContents.some((c) => /\bnoindex\b/i.test(c));

// --- what does robots.txt say for the wildcard user-agent block? ---
const wildcardBlockMatch = robotsTxt.match(/User-Agent:\s*\*\s*\n([\s\S]*?)(?:\n\s*\n|$)/i);
const wildcardBlock = wildcardBlockMatch ? wildcardBlockMatch[1] : '';
const txtAllowsRoot = /^Allow:\s*\/\s*$/m.test(wildcardBlock);
const txtDisallowsRoot = /^Disallow:\s*\/\s*$/m.test(wildcardBlock);

if (isStaging) {
  console.log(`checking as STAGING build (canonical: ${canonicalUrl})`);
  if (!pageHasNoindex) {
    fail('staging build but out/index.html has no noindex robots meta tag — app/layout.tsx or app/lib/env.ts regressed.');
  }
  if (!txtDisallowsRoot || txtAllowsRoot) {
    fail('staging build but out/robots.txt does not disallow everything — app/robots.ts regressed.');
  }
} else {
  console.log(`checking as PRODUCTION build (canonical: ${canonicalUrl})`);
  if (pageHasNoindex) {
    fail(
      `production build but out/index.html carries a noindex robots meta tag (content="${robotsMetaContents.find((c) => /noindex/i.test(c))}") — this would de-index the live site.`
    );
  }
  if (!txtAllowsRoot || txtDisallowsRoot) {
    fail('production build but out/robots.txt does not allow crawling — this would de-index the live site.');
  }
}

if (!process.exitCode) {
  console.log(
    `✔ noindex guard: ${isStaging ? 'staging' : 'production'} export is self-consistent (meta robots + robots.txt agree with the canonical URL)`
  );
}
