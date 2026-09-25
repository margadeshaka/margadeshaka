import type { MetadataRoute } from 'next';
import { isStagingBuild } from './lib/env';

export const dynamic = 'force-static';

/**
 * Next.js metadata-route convention (same mechanism as app/sitemap.ts),
 * replacing the old static public/robots.txt so the file itself can react to
 * the same build-time staging signal as app/layout.tsx's `robots` metadata —
 * see app/lib/env.ts for what the signal is and the fail-safe direction.
 *
 * This is defence in depth, layer two: layer one is the X-Robots-Tag header
 * in firebase.json (scripts/verify-hosting-config.mjs), which wins today
 * regardless of what this file says. Layer three is
 * scripts/verify-noindex.mjs, which reads the built export and would fail
 * the build if this file and the header ever disagreed.
 */
export default function robots(): MetadataRoute.Robots {
  if (isStagingBuild()) {
    // Staging must never be crawled — it would compete with production as
    // duplicate content. Everything is disallowed, and there is no sitemap
    // reference: nothing here is worth a crawler discovering.
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production: same directives as the static robots.txt this replaces.
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/images/', '/manifest.json', '/*.css', '/*.js'],
        disallow: ['/admin/', '/api/'],
        crawlDelay: 1,
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
    ],
    sitemap: 'https://margadeshaka.com/sitemap.xml',
  };
}
