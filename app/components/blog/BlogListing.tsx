'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { posts } from '../../data/blogPosts';
import type { BlogPost } from '../../data/blogPosts';
import { ArrowRight, Search } from '../icons';
import { blogPost } from '../../lib/routes';

/**
 * Blog listing, ported from the handoff (blog.jsx: BlogPage + PostRow).
 *
 * The redesign drops the previous card grid for a single-column editorial feed
 * at 780px, with client-side search over title, excerpt and category. The
 * handoff also styles a category filter (`.blog-catfilter`) but its BlogPage
 * doesn't render one, so this doesn't either.
 */
function PostRow({ post, i }: { post: BlogPost; i: number }) {
  return (
    <Link
      href={blogPost(post.slug)}
      className="blog-row"
      data-reveal="row"
    >
      <h2 className="blog-row-title">{post.title}</h2>
      <div className="blog-row-meta">
        <span>{post.readTime}</span>
        <span className="blog-row-dot">·</span>
        <time dateTime={post.isoDate}>{post.date}</time>
      </div>
      <p className="blog-row-excerpt">{post.excerpt}</p>
      <div className="blog-row-foot">
        <span className="blog-row-read">
          Read article <ArrowRight className="blog-arrow" width={14} height={14} />
        </span>
      </div>
    </Link>
  );
}

export default function BlogListing() {
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div
      className="page-enter cosmic-bg"
      style={{ position: 'relative', paddingTop: 120, paddingBottom: 96 }}
    >
      <div className="blog-feed" style={{ position: 'relative', padding: '0 24px' }}>
        <header className="blog-feed-head">
          <span className="eyebrow eyebrow-dot">
            <span className="gold-dot" /> The Margadeshaka Blog
          </span>
          <h1 className="blog-feed-h1">
            Notes from <span className="gold-text">the path</span>
          </h1>
          <p className="blog-feed-sub">
            Reflection, well-being, and thoughtful ideas on building AI that guides, not replaces.
          </p>
        </header>

        <div className="blog-controls">
          <div className="blog-search">
            <Search width={15} height={15} />
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>
        </div>

        <div className="blog-list">
          {list.map((p, i) => (
            <PostRow key={p.slug} post={p} i={i} />
          ))}
        </div>

        {list.length === 0 && (
          <p style={{ marginTop: 32, color: 'rgb(var(--fg-rgb) / max(0.5, var(--fg-a-min)))' }}>No articles found.</p>
        )}
      </div>
    </div>
  );
}
