import { MetadataRoute } from 'next';
import { getAllSlugs } from './data/blogPosts';
import { ROUTES, blogPost, absolute } from './lib/routes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com').trim();
  const now = new Date();

  // Sitemaps must list distinct indexable pages only — no hash fragments,
  // no query strings that produce the same content, no localhost URLs.
  // Paths come from ROUTES so the trailing slashes match the shape the site
  // actually serves; a sitemap advertising /blog would send every crawler
  // through a 301.
  return [
    {
      url: absolute(baseUrl, ROUTES.home),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: absolute(baseUrl, ROUTES.blog),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...getAllSlugs().map((slug) => ({
      url: absolute(baseUrl, blogPost(slug)),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: absolute(baseUrl, ROUTES.compliance),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absolute(baseUrl, ROUTES.privacy),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: absolute(baseUrl, ROUTES.terms),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
