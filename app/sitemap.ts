import { MetadataRoute } from 'next';
import { getAllSlugs } from './data/blogPosts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com').trim();
  const now = new Date();

  // Sitemaps must list distinct indexable pages only — no hash fragments,
  // no query strings that produce the same content, no localhost URLs.
  // Every URL carries a trailing slash: with `trailingSlash: true` (and
  // skipTrailingSlashRedirect suppressing the reconciling redirect) the pages
  // are served canonically at /blog/ etc., and the sitemap must advertise the
  // exact canonical shape.
  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...getAllSlugs().map((slug) => ({
      url: `${baseUrl}/blog/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/compliance/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
