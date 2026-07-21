'use client';

import Link from 'next/link';
import { useState, type MouseEvent } from 'react';
import { posts, getFeaturedPost, getCategories, type BlogPost } from '../../data/blogPosts';
import { ArrowRight, StarIcon, CatChip, MetaLine, catMeta, chip, ACCENT } from './shared';

export default function BlogListing() {
  const featured = getFeaturedPost();
  const categories = getCategories();
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');

  const showFeatured = filter === 'All';
  const grid =
    filter === 'All' ? posts.filter((p) => p !== featured) : posts.filter((p) => p.category === filter);

  return (
    <div className="container-full page-enter">
      <header className="max-w-[760px]">
        <span className="eyebrow eyebrow-dot">
          <span className="gold-dot" aria-hidden="true" /> The Margadeshaka Blog
        </span>
        <h1
          className="font-display text-white mt-3.5"
          style={{ fontSize: 'clamp(48px, 7vw, 84px)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.035em' }}
        >
          Notes from <span className="gold-text">the path</span>
        </h1>
        <p
          className="mt-5 text-white/[0.65] max-w-[620px]"
          style={{ fontSize: 19, fontWeight: 300, lineHeight: 1.65 }}
        >
          Engineering, philosophy, and lessons from the road — how we build AI that guides without deciding for
          you.
        </p>
        <div
          className="mt-[22px] flex flex-wrap text-white/55"
          style={{ gap: '6px 16px', fontSize: 12, fontWeight: 400, letterSpacing: '0.02em' }}
        >
          <span>{posts.length} articles</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>Written by the founder</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>New notes monthly</span>
        </div>
      </header>

      {showFeatured && (
        <div className="mt-5">
          <FeaturedCard post={featured} />
        </div>
      )}

      <div className="blog-gridhead">
        <h2 className="blog-gridhead-title">{filter === 'All' ? 'Latest articles' : filter}</h2>
        <div className="blog-filter" role="group" aria-label="Filter articles by category">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setFilter(c)} aria-pressed={filter === c}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-grid mt-6">
        {grid.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      {grid.length === 0 && (
        <p className="mt-10 text-center text-white/50">No articles in this category yet.</p>
      )}
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const { glyph } = catMeta(post.category);
  return (
    <Link href={`/blog/${post.slug}`} className="glass glass-interactive blog-featured">
      <div
        className="relative flex flex-col justify-center"
        style={{ padding: 'clamp(28px, 4vw, 48px)' }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span style={{ ...chip(), fontWeight: 600 }}>★ Featured</span>
          <CatChip post={post} />
        </div>
        <h2
          className="font-display text-white"
          style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em' }}
        >
          {post.title}
        </h2>
        <p
          className="mt-4 text-white/[0.62] max-w-[560px]"
          style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.65 }}
        >
          {post.excerpt}
        </p>
        <div className="mt-[26px] flex items-center justify-between gap-4 flex-wrap">
          <span
            className="inline-flex items-center gap-2 font-semibold"
            style={{ color: ACCENT.color, fontSize: 15 }}
          >
            Read article <ArrowRight width={16} height={16} />
          </span>
          <MetaLine post={post} />
        </div>
      </div>
      <div className="blog-featured-cover" aria-hidden="true">
        <span className="stars" style={{ position: 'absolute', opacity: 0.5 }} />
        <span className="blog-featured-glyph font-devanagari">{glyph}</span>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const { glyph } = catMeta(post.category);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--rx', `${((0.5 - py) * 6).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * 6).toFixed(2)}deg`);
  };

  const onLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass glass-interactive blog-book"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="blog-book-spot" aria-hidden="true" />
      <div className="blog-book-body">
        <div className="blog-book-top">
          <span className="blog-book-icon font-devanagari" aria-hidden="true">
            {glyph}
          </span>
          <span className="blog-book-cat">{post.category}</span>
        </div>
        <h3 className="blog-book-title font-display">{post.title}</h3>
        <p className="blog-book-excerpt">{post.excerpt}</p>
        <div className="blog-book-meta">
          <span>
            <StarIcon width={13} height={13} />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
