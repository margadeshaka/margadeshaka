import Link from 'next/link';
import { Metadata } from 'next';
import CosmicLayer from '../components/CosmicLayer';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import SEOStructuredData from '../components/SEOStructuredData';
import { ArrowRight } from '../components/icons';
import { posts, ACCENTS, BlogPost } from '../data/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Engineering, philosophy, and the occasional wrong turn — how Margadeshaka builds AI that guides without deciding for you.',
  alternates: { canonical: '/blog' },
};

function CatChip({ post }: { post: BlogPost }) {
  const accent = ACCENTS[post.accent];
  return (
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
  );
}

function MetaLine({ post }: { post: BlogPost }) {
  return (
    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
      {post.date} · {post.readTime}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const accent = ACCENTS[post.accent];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass glass-interactive glass-accent"
      style={{
        display: 'block',
        position: 'relative',
        padding: 36,
        overflow: 'hidden',
        marginTop: 40,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: accent.glow,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            color: '#1A1224',
            background: 'var(--brand-gold)',
          }}
        >
          Featured
        </span>
        <CatChip post={post} />
      </div>
      <div style={{ position: 'relative', marginTop: 16 }}>
        <MetaLine post={post} />
      </div>
      <h2
        className="font-display"
        style={{
          position: 'relative',
          marginTop: 10,
          fontSize: 'clamp(24px, 3vw, 34px)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
        }}
      >
        {post.title}
      </h2>
      <p style={{ position: 'relative', marginTop: 12, color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.6, maxWidth: 640 }}>
        {post.excerpt}
      </p>
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 20,
          color: 'var(--brand-gold)',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Read article <ArrowRight />
      </span>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const accent = ACCENTS[post.accent];
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass glass-interactive"
      style={{ display: 'block', padding: 24, position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: accent.color,
        }}
      />
      <CatChip post={post} />
      <h3
        className="font-display"
        style={{
          marginTop: 14,
          fontSize: 19,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.3,
        }}
      >
        {post.title}
      </h3>
      <p style={{ marginTop: 10, color: 'rgba(255,255,255,0.6)', fontSize: 14.5, lineHeight: 1.6 }}>{post.excerpt}</p>
      <div
        style={{
          marginTop: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <MetaLine post={post} />
        <ArrowRight style={{ color: accent.color }} />
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <CosmicLayer />
      <Navbar />
      <main className="relative pt-32 pb-20 cosmic-bg min-h-screen">
        <div className="container-full page-enter" style={{ padding: '0 24px', position: 'relative' }}>
          <header>
            <span className="eyebrow eyebrow-dot">
              <span className="gold-dot" /> The Margadeshaka Blog
            </span>
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(38px, 5.5vw, 64px)',
                fontWeight: 700,
                marginTop: 14,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              Notes from <span className="gold-text">the path</span>
            </h1>
            <p style={{ marginTop: 16, fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: 620, lineHeight: 1.6 }}>
              Engineering, philosophy, and the occasional wrong turn — how we build AI that guides without deciding
              for you.
            </p>
          </header>

          <FeaturedCard post={featured} />

          <div
            style={{
              marginTop: 24,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div
            className="glass glass-accent"
            style={{
              marginTop: 56,
              padding: 36,
              textAlign: 'center',
            }}
          >
            <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
              Occasional letters, no noise
            </h2>
            <p style={{ marginTop: 10, color: 'rgba(255,255,255,0.6)', fontSize: 15, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
              New posts on Sakha, Dronacharya, and what we're learning building AI that shows the path.
            </p>
            <div
              style={{
                marginTop: 22,
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                style={{
                  padding: '12px 18px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.14)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 14,
                  minWidth: 260,
                }}
              />
              <button type="button" className="btn btn-primary">
                Subscribe <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <SEOStructuredData
        blog={{ posts }}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ]}
      />
    </>
  );
}
