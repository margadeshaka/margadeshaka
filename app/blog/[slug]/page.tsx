import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CosmicLayer from '../../components/CosmicLayer';
import Navbar from '../../components/Navbar';
import SiteFooter from '../../components/SiteFooter';
import SEOStructuredData from '../../components/SEOStructuredData';
import { ArrowLeft, ArrowRight } from '../../components/icons';
import { allSlugs, getPost, posts, ACCENTS } from '../../data/blog';

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(post.date).toISOString(),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const accent = ACCENTS[post.accent];
  const currentIndex = posts.indexOf(post);
  const next = posts[(currentIndex + 1) % posts.length];
  const nextAccent = ACCENTS[next.accent];

  return (
    <>
      <CosmicLayer />
      <Navbar />
      <main className="relative pt-32 pb-20 cosmic-bg min-h-screen">
        <div className="container-prose page-enter" style={{ position: 'relative', padding: '0 24px' }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-gold text-sm mb-8 hover:text-brand-gold-light transition-colors"
          >
            <ArrowLeft /> All articles
          </Link>

          <header style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  color: accent.color,
                  background: accent.bg,
                  border: `1px solid ${accent.border}`,
                }}
              >
                {post.category}
              </span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {post.date} · {post.readTime}
              </span>
            </div>

            <h1
              className="font-display text-white"
              style={{
                marginTop: 16,
                fontSize: 'clamp(32px, 4.6vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {post.title}
            </h1>

            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFB830, #FFC864 50%, #FFE4B5)',
                  color: '#1A1224',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <span className="font-display">HG</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{post.author}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>Founder & CEO, Margadeshaka</div>
              </div>
            </div>
          </header>

          <div className="legal-prose" style={{ fontSize: 17.5, lineHeight: 1.8 }}>
            {post.body.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2 key={i} style={{ fontSize: 26, marginTop: 40 }}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={i}
                    style={{
                      margin: '32px 0',
                      padding: '20px 28px',
                      borderLeft: `3px solid ${accent.color}`,
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '0 14px 14px 0',
                      fontSize: 20,
                      fontStyle: 'italic',
                      color: '#fff',
                      lineHeight: 1.5,
                    }}
                  >
                    {block.text}
                  </blockquote>
                );
              }
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <div className="saffron-divider" style={{ margin: '48px 0' }} />

          <Link
            href={`/blog/${next.slug}`}
            className="glass glass-interactive"
            style={{ display: 'block', padding: 24 }}
          >
            <span className="eyebrow">Read next</span>
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.3,
                }}
              >
                {next.title}
              </h3>
              <ArrowRight style={{ color: nextAccent.color, flexShrink: 0 }} />
            </div>
          </Link>
        </div>
      </main>
      <SiteFooter />
      <SEOStructuredData
        article={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          category: post.category,
          author: post.author,
        }}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
    </>
  );
}
