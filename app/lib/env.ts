/**
 * Build-time environment detection for the static export.
 *
 * `output: 'export'` (next.config.js) means there is no runtime environment —
 * every page is rendered once at build time, so "is this staging or
 * production" has to be decided from a build-time variable, not a request.
 * `NEXT_PUBLIC_BASE_URL` is that variable: `.github/workflows/deploy.yml`
 * bakes it in as exactly `https://margadeshaka-staging.web.app` for a staging
 * build and exactly `https://margadeshaka.com` for a production build (see
 * its "Resolve environment" and "Build static export" steps).
 *
 * FAIL-SAFE DIRECTION — read this before adding another call site.
 * Accidentally indexing staging for a while is recoverable; accidentally
 * de-indexing production (because this variable was unset, misspelled, or
 * held some unexpected value) would destroy the live site's search presence,
 * and that is not quickly recoverable. So `isStagingBuild()` only returns
 * true on an exact match against the known staging origin — a missing,
 * malformed, or merely-unrecognised value falls through to `false`, i.e. to
 * production (indexable) behaviour. Never invert this default.
 *
 * Single source of truth: every place that needs to branch on staging vs.
 * production for SEO purposes (app/layout.tsx's `robots` metadata, app/robots.ts)
 * must call this helper rather than re-deriving the check.
 */
const STAGING_BASE_URL = 'https://margadeshaka-staging.web.app';

export function isStagingBuild(): boolean {
  return (process.env.NEXT_PUBLIC_BASE_URL || '').trim() === STAGING_BASE_URL;
}
