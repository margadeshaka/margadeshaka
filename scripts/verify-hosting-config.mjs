#!/usr/bin/env node
/**
 * Guards against the staging and production Hosting configs drifting apart.
 *
 * firebase.json carries the same config twice — once per site — because
 * Firebase has no way to share one hosting block across two targets. That
 * duplication is the failure mode this catches: someone tunes a Cache-Control
 * rule on production, forgets staging, and staging silently stops representing
 * what production will do.
 *
 * Exactly one difference is allowed: staging adds an `X-Robots-Tag:
 * noindex, nofollow` block so search engines can't index it as a duplicate of
 * the real site.
 *
 * Run in CI before deploying. Exits non-zero on drift.
 */
import { readFileSync } from 'node:fs';

const NOINDEX = { key: 'X-Robots-Tag', value: 'noindex, nofollow' };

const cfg = JSON.parse(readFileSync(new URL('../firebase.json', import.meta.url), 'utf8'));
const fail = (msg) => {
  console.error(`✖ hosting config: ${msg}`);
  process.exitCode = 1;
};

if (!Array.isArray(cfg.hosting)) {
  fail('expected `hosting` to be an array of two targets (production, staging)');
  process.exit(1);
}

const byTarget = Object.fromEntries(cfg.hosting.map((h) => [h.target, h]));
const prod = byTarget.production;
const stag = byTarget.staging;

if (!prod || !stag) {
  fail(`expected targets "production" and "staging", got: ${Object.keys(byTarget).join(', ')}`);
  process.exit(1);
}

// --- the noindex block must be present on staging and absent on production ---
const hasNoindex = (h) =>
  (h.headers ?? []).some((b) =>
    (b.headers ?? []).some((x) => x.key === NOINDEX.key && x.value === NOINDEX.value)
  );

if (!hasNoindex(stag)) fail('staging is missing the X-Robots-Tag noindex block — it would be indexable');
if (hasNoindex(prod)) fail('production carries an X-Robots-Tag noindex block — it would be de-indexed');

// --- everything else must match exactly ---
const strip = (h) => {
  const { target, headers, ...rest } = h;
  return {
    ...rest,
    headers: (headers ?? []).filter(
      (b) => !(b.headers ?? []).some((x) => x.key === NOINDEX.key)
    ),
  };
};

const a = JSON.stringify(strip(prod), null, 2);
const b = JSON.stringify(strip(stag), null, 2);

if (a !== b) {
  fail('production and staging differ beyond the noindex header');
  const al = a.split('\n');
  const bl = b.split('\n');
  for (let i = 0; i < Math.max(al.length, bl.length); i++) {
    if (al[i] !== bl[i]) {
      console.error(`  first difference at line ${i + 1}:`);
      console.error(`    production: ${al[i] ?? '(absent)'}`);
      console.error(`    staging:    ${bl[i] ?? '(absent)'}`);
      break;
    }
  }
}

// --- trailingSlash must mirror next.config.js or routes 404 / double-redirect ---
const nextCfg = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8');
const nextTrailing = /trailingSlash:\s*true/.test(nextCfg);
for (const h of cfg.hosting) {
  if (Boolean(h.trailingSlash) !== nextTrailing) {
    fail(
      `${h.target}: trailingSlash is ${Boolean(h.trailingSlash)} but next.config.js is ${nextTrailing} — these must match`
    );
  }
}

if (!process.exitCode) {
  console.log('✔ hosting config: production and staging match (staging noindex only), trailingSlash mirrors next.config.js');
}
