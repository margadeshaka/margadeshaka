'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { getAdjacentPosts, type BlogPost } from '../../data/blogPosts';
import { ArrowLeft, ArrowRight, CatChip, MetaLine, ACCENT } from './shared';
import SakhaCta from '../SakhaCta';
import { company } from '../../lib/company';

const endPathVar = (d: number) => ({ ['--d']: String(d) }) as CSSProperties;

/**
 * Distance from the viewport top at which a heading counts as "reached".
 *
 * Single source of truth for the scroll offset: it is applied as
 * `scrollMarginTop` on each h2 (so native `#sec-N` anchor jumps land correctly)
 * and reused by scrollToHeading. Previously those were two independent
 * constants that happened to agree.
 */
const HEADING_OFFSET = 100;

/**
 * The line a heading must cross to become the active TOC entry. Sits a little
 * below HEADING_OFFSET so the entry lights up as the heading settles into
 * reading position rather than the instant it clears the navbar.
 */
const READ_LINE = HEADING_OFFSET + 40;

export default function BlogArticle({ post }: { post: BlogPost }) {
  const { next } = getAdjacentPosts(post.slug);

  const headings = useMemo(
    () =>
      post.body.flatMap((block, i) => (block.type === 'h2' ? [{ id: `sec-${i}`, text: block.text }] : [])),
    [post],
  );

  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      setProgress(p);
      // Reveal the closing CTAs at the bottom — and immediately when the article
      // is too short to scroll (max <= 0), so they're never permanently hidden.
      if (max <= 0 || p >= 0.99) setEnded(true);

      /*
       * Active heading = the LAST one whose top has passed the read line.
       *
       * This replaced an IntersectionObserver that only ever called
       * setActiveId on `isIntersecting`, with rootMargin '-25% 0px -65% 0px'.
       * That was wrong three ways: it never cleared the active id, so the
       * highlight stuck; when several entries arrived in one callback the last
       * in the array won (and `entries` is not in document order), so it could
       * land on the wrong heading; and the live band was only 10% of the
       * viewport, narrow enough that a heading could scroll straight through
       * without ever firing — which is exactly what left the tick stranded
       * during fast scrolling and during the TOC's own smooth-scroll jump.
       *
       * Reading positions directly is deterministic: it cannot miss a heading,
       * it handles scrolling up, and it needs no rootMargin tuning. See MAR-538.
       */
      let current: string | null = null;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= READ_LINE) current = id;
        else break; // headings are in document order — nothing later can match
      }
      // Before the first heading, keep the first entry lit rather than nothing,
      // so the TOC never looks inert at the top of the article.
      setActiveId(current ?? headings[0]?.id ?? null);
    };

    // rAF-throttled: scroll fires far more often than we can usefully repaint.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // `scrollMarginTop` on the h2 owns the offset for native anchor jumps; this
    // path is manual, so it applies the same constant rather than a second,
    // different magic number.
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - HEADING_OFFSET,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="blog-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      {headings.length > 1 && (
        <nav className="blog-toc" aria-label="On this page">
          <div className="blog-toc-head">On this page</div>
          <ul>
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={activeId === h.id ? 'is-active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(h.id);
                  }}
                >
                  <span className="blog-toc-tick" />
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="container-prose page-enter">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-brand-gold text-sm mb-8 hover:text-brand-gold-light transition-colors"
        >
          <ArrowLeft /> All articles
        </Link>

        <header className="mb-10 pb-8 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <CatChip post={post} />
            <MetaLine post={post} />
          </div>
          <h1
            className="font-display text-white"
            style={{ fontSize: 'clamp(32px, 4.6vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mt-6">
            <span
              className="w-10 h-10 rounded-full grid place-items-center font-display flex-none"
              style={{
                background: 'linear-gradient(135deg, #FFB830, #FFC864 50%, #FFE4B5)',
                fontSize: 15,
                fontWeight: 700,
                color: '#1A1224',
              }}
              aria-hidden="true"
            >
              HG
            </span>
            <div>
              <div className="text-white text-sm font-semibold">{post.author}</div>
              {/* Read from company.ts rather than hardcoding: the same title is
                  also emitted into Organization JSON-LD, so a hardcoded string
                  here drifts silently. Note company.team[0] separately lists
                  Hitesh as "Director" — see the PR for that open question. */}
              <div className="text-white/50 text-[13px]">
                {company.founder.role}, {company.brand}
              </div>
            </div>
          </div>
        </header>

        <div className="legal-prose" style={{ fontSize: 17.5, lineHeight: 1.8 }}>
          {post.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} id={`sec-${i}`} style={{ fontSize: 26, marginTop: 40, scrollMarginTop: HEADING_OFFSET }}>
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
                    borderLeft: `3px solid ${ACCENT.color}`,
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

        {/* `inert` until revealed keeps the hidden CTAs out of the tab order
            and the a11y tree (they're opacity:0 / pointer-events:none in CSS). */}
        <div className={`blog-end${ended ? ' is-ended' : ''}`} inert={!ended}>
          <div className="blog-end-badge">
            <span className="font-devanagari">✷</span> You&rsquo;ve reached the end of this article.
          </div>
          <div className="blog-end-paths">
            <span className="blog-end-node" aria-hidden="true" />
            <Link href={`/blog/${next.slug}`} className="glass glass-interactive blog-end-path" style={endPathVar(1)}>
              <span className="blog-end-line" aria-hidden="true" />
              <span className="blog-end-label">
                Continue Reading <ArrowRight width={15} height={15} />
              </span>
            </Link>
            {/* Routes to the App Store / Play Store per platform once those
                listings are live, otherwise opens the download modal. */}
            <SakhaCta className="glass glass-interactive blog-end-path" style={endPathVar(2)}>
              <span className="blog-end-line" aria-hidden="true" />
              <span className="blog-end-label">
                Talk to Sakha <ArrowRight width={15} height={15} />
              </span>
            </SakhaCta>
            <Link href="/" className="glass glass-interactive blog-end-path" style={endPathVar(3)}>
              <span className="blog-end-line" aria-hidden="true" />
              <span className="blog-end-label">
                Explore Margadeshaka <ArrowRight width={15} height={15} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
