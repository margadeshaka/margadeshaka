/**
 * Single source of truth for internal route paths.
 *
 * Every path here carries a trailing slash, because that is the only shape this
 * site actually serves. `next.config.js` sets `trailingSlash: true` (so the
 * export writes `out/blog/index.html`, served at `/blog/`) *and*
 * `skipTrailingSlashRedirect: true`, which removes the redirect that would
 * normally reconcile `/blog` to `/blog/`. Firebase Hosting then applies its own
 * `trailingSlash: true`. The result: a slashless internal link is not broken,
 * it is silently slower — one 301 round-trip on every click, plus a needless
 * hop for any crawler following it.
 *
 * This convention regressed twice before this module existed (once in the
 * JSON-LD and sitemap, once across eleven component `<Link href>` values), so
 * route paths are built here and nowhere else.
 *
 * Two things this module deliberately does NOT cover:
 *
 *  1. `usePathname()` comparisons. `usePathname()` returns the served path, so
 *     it yields '/compliance/' — with the slash. Navbar and SectionLink strip
 *     it before comparing (`(pathname || '/').replace(/\/+$/, '') || '/'`).
 *     Hrefs carry the slash; comparisons must not. Feeding ROUTES into a
 *     pathname comparison silently breaks active-state highlighting and the
 *     `aria-current` attributes.
 *
 *  2. Next's own metadata resolution. `alternates.canonical` and
 *     `openGraph.url` are resolved against `metadataBase` with the
 *     `trailingSlash` config applied, so Next appends the slash itself and
 *     `canonical: '/blog'` already emits `.../blog/`. Passing ROUTES there is
 *     still correct (the normalisation is idempotent) and is what we do, so
 *     that one rule — "route paths come from here" — holds everywhere instead
 *     of holding everywhere except the places Next happens to rescue.
 *
 * `scripts/verify-trailing-slashes.mjs` enforces the invariant against the
 * built export, so a hardcoded slashless path fails CI rather than shipping.
 */

/** Static route paths, canonical (trailing-slash) form. */
export const ROUTES = {
  home: '/',
  blog: '/blog/',
  compliance: '/compliance/',
  privacy: '/privacy/',
  terms: '/terms/',
} as const;

/** Canonical path for a single blog post. */
export function blogPost(slug: string): string {
  return `/blog/${slug}/`;
}

/**
 * Link to a section of the home page.
 *
 * A fragment on the root — `/#team` — needs no trailing slash: the path part is
 * already '/'. It lives here so that every internal URL in the codebase comes
 * from one module, and so the verifier's rules have one place to point at.
 */
export function homeSection(id: string): string {
  return `/#${id}`;
}

/** Absolute URL for a route path, for JSON-LD, sitemaps and OG tags. */
export function absolute(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/+$/, '')}${path}`;
}
