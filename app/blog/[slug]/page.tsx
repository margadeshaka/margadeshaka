import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import CosmicLayer from '../../components/CosmicLayer';
import SiteFooter from '../../components/SiteFooter';
import SEOStructuredData from '../../components/SEOStructuredData';
import BlogArticle from '../../components/blog/BlogArticle';
import { getAllSlugs, getPostBySlug } from '../../data/blogPosts';
import { company } from '../../lib/company';

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
      images: [{ url: '/images/chakra.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/images/chakra.png'],
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
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/blog/${post.slug}` },
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: company.founder.role,
      url: company.founder.linkedin,
    },
    publisher: {
      '@type': 'Organization',
      name: company.brand,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/chakra.png` },
    },
  };

  return (
    <>
      <CosmicLayer />
      <Navbar />

      <main className="relative pt-32 pb-20 cosmic-bg min-h-screen overflow-x-hidden">
        {/* key per slug forces a fresh mount on article→article navigation so
            scroll/progress/ended state doesn't leak from the previous post. */}
        <BlogArticle key={post.slug} post={post} />
      </main>

      <SiteFooter />
      <SEOStructuredData
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </>
  );
}
