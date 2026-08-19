import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SEOStructuredData from '../../components/SEOStructuredData';
import BlogArticle from '../../components/blog/BlogArticle';
import { getAllSlugs, getPostBySlug } from '../../data/blogPosts';
import { company, isFounder } from '../../lib/company';

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || company.web.site).trim();

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  /*
   * Prefer the post's own cover for social previews — it carries the article's
   * title and subject, so a shared link shows what the piece is about instead
   * of the generic site card. Falls back to the site card for posts with no
   * cover of their own.
   */
  const social = post.cover
    ? { url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.cover.alt }
    : { url: '/images/og-margadeshaka.png', width: 1200, height: 630, alt: post.title };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.isoDate,
      authors: [post.author],
      section: post.category,
      images: [social],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [social.url],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    articleSection: post.category,
    inLanguage: 'en',
    // Google's article rich results want an image; posts without a cover fall
    // back to the same 1200x630 og card the social metadata uses (a logo is
    // not article content, and it already appears as publisher.logo).
    image: post.cover ? `${baseUrl}${post.cover.src}` : `${baseUrl}/images/og-margadeshaka.png`,
    // Trailing slash: the canonical shape the site serves (trailingSlash: true,
    // no reconciling redirect) — must match <link rel=canonical> and the sitemap.
    url: `${baseUrl}/blog/${post.slug}/`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/blog/${post.slug}/` },
    // Only the founder carries a jobTitle and profile URL — guest authors are
    // a plain Person, so their posts don't claim the founder's designation.
    author:
      isFounder(post.author)
        ? {
            '@type': 'Person',
            name: post.author,
            jobTitle: company.founder.role,
            url: company.founder.linkedin,
          }
        : { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: company.brand,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/icon.png` },
    },
  };

  return (
    <>

      <div
        className="page-enter relative pb-20 cosmic-bg min-h-screen overflow-x-hidden"
        style={{ paddingTop: 120 }}
      >
        {/* key per slug forces a fresh mount on article→article navigation so
            scroll/progress/ended state doesn't leak from the previous post. */}
        <BlogArticle key={post.slug} post={post} />
      </div>

      <SEOStructuredData
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog/' },
          { name: post.title, href: `/blog/${post.slug}/` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </>
  );
}
