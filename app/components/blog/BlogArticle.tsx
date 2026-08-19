'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { getAdjacentPosts, type BlogPost } from '../../data/blogPosts';
import { ArrowLeft, ArrowRight, CatChip, MetaLine, ACCENT } from './shared';
import SakhaCta from '../SakhaCta';
import { company } from '../../lib/company';

/**
 * Inline links inside body copy.
 *
 * A body block is a plain string, so a link is authored as markdown —
 * `[label](/href)` — and split back out here. Text containing no link is
 * returned as the same string, so the overwhelmingly common case allocates
 * nothing and React still renders a single text node.
 *
 * Internal hrefs go through next/link to stay client-side; anything else is
 * treated as external and opens in a new tab.
 */
const INLINE_LINK = '\\[([^\\]]+)\\]\\(([^)]+)\\)';

function withInlineLinks(text: string): ReactNode {
  if (!text.includes('](')) return text;

  // Built per call: a shared global regex carries lastIndex between calls, so
  // reusing one would make every second paragraph skip its first link.
  const pattern = new RegExp(INLINE_LINK, 'g');
  const parts: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const at = match.index;
    const [raw, label, href] = match;
    if (at > cursor) parts.push(text.slice(cursor, at));
    parts.push(
      href.startsWith('/') ? (
        <Link key={at} href={href}>
          {label}
        </Link>
      ) : (
        <a key={at} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ),
    );
    cursor = at + raw.length;
  }
  parts.push(text.slice(cursor));
  return parts;
}

/**
 * The same text with links flattened to their labels, for where a heading is
 * reused as plain text: the "On this page" rail. Without this the rail would
 * print the raw `[label](/href)` instead of the word.
 */
function plainText(text: string): string {
  return text.includes('](') ? text.replace(new RegExp(INLINE_LINK, 'g'), '$1') : text;
}

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

/**
 * Distance from the top of the viewport at which the TOC rail sits. Applied
 * inline rather than in CSS so the lift calculation and the rendered position
 * cannot drift apart.
 */
const TOC_TOP = 140;

/**
 * How far into the viewport the closing block must reach before it reveals.
 * Enough that the reader sees it animate in rather than finding it already
 * there, without waiting until it is halfway up the screen.
 */
const END_REVEAL = 120;

export default function BlogArticle({ post }: { post: BlogPost }) {
  const { next } = getAdjacentPosts(post.slug);

  const headings = useMemo(
    () =>
      post.body.flatMap((block, i) => (block.type === 'h2' ? [{ id: `sec-${i}`, text: plainText(block.text) }] : [])),
    [post],
  );

  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  /*
   * How far to lift the rail so it never outlives the article.
   *
   * The rail is position: fixed, so left alone it rides down over the footer.
   * The first fix hid it once the last heading passed the read line, but that
   * moment comes well before the article ends — the final section's paragraphs,
   * the divider and the closing block all follow it — so the rail vanished
   * while there was still page to read.
   *
   * Instead it now tracks the bottom of the article: once the rail would
   * extend past it, we translate it up by exactly the overshoot, so it scrolls
   * away in lockstep with the content it belongs to (what position: sticky
   * would do, which the fixed positioning rules out) and is clear of the
   * footer by construction.
   */
  const [tocLift, setTocLift] = useState(0);
  const proseRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      setProgress(p);
      /*
       * Reveal the closing block as it comes into view, not at a percentage of
       * the page. It used to wait for p >= 0.99, but the footer is a large
       * share of the scroll range, so 99% is effectively the very bottom — the
       * block had been on screen for a while by then and only faded in once the
       * reader had scrolled past it.
       *
       * Still reveals immediately when the article is too short to scroll
       * (max <= 0), so it can never stay permanently hidden.
       */
      const end = endRef.current;
      if (max <= 0 || (end && end.getBoundingClientRect().top < window.innerHeight - END_REVEAL)) {
        setEnded(true);
      }

      // Lift the rail by however far it overshoots the end of the article, so
      // it leaves with the content instead of floating on over the footer.
      const prose = proseRef.current;
      const rail = tocRef.current;
      if (prose && rail) {
        const railBottom = TOC_TOP + rail.offsetHeight;
        setTocLift(Math.max(0, railBottom - prose.getBoundingClientRect().bottom));
      }

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
        <nav
          ref={tocRef}
          className="blog-toc"
          aria-label="On this page"
          style={{ top: TOC_TOP, transform: tocLift ? `translateY(-${tocLift}px)` : undefined }}
        >
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

      <div ref={proseRef} className="container-prose page-enter">
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
            {/* The initials disc reads as a founder mark — guest authors get a
                plain-text byline, so a lone letter never sits in the circle. */}
            {post.author === company.founder.name && (
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
                {post.author
                  .split(/\s+/)
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            )}
            <div>
              <div className="text-white text-sm font-semibold">{post.author}</div>
              {/* The role line belongs to the founder alone — guest authors get
                  no designation. Read from company.ts rather than hardcoding:
                  the same title is also emitted into Organization JSON-LD, so a
                  hardcoded string here drifts silently. Note company.team[0]
                  separately lists Hitesh as "Director" — see the PR for that
                  open question. */}
              {post.author === company.founder.name && (
                <div className="text-white/50 text-[13px]">
                  {company.founder.role}, {company.brand}
                </div>
              )}
            </div>
          </div>
        </header>

        {post.cover && (
          /*
            Sits between the header and the body so it reads as the article's
            own cover rather than page furniture. width/height are set from the
            real pixel size so the browser reserves the box before the file
            arrives — without them the whole article jumps down when it loads,
            which is a layout shift on the largest element on the page.

            eager + high priority because this is the LCP element on the route;
            lazy-loading it would delay the very thing being measured.
          */
          <figure className="blog-cover" data-reveal="fade">
            {/* eslint-disable-next-line @next/next/no-img-element -- next/image
                is disabled repo-wide (output: 'export' + unoptimized), so it
                would add a wrapper and no optimisation. */}
            <img
              src={post.cover.src}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        )}

        <div className="legal-prose" style={{ fontSize: 17.5, lineHeight: 1.8 }}>
          {post.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                /*
                  `fade`, not `up`: the TOC reads each heading's
                  getBoundingClientRect() to pick the active entry and to scroll
                  to it, and a transform DOES move that box. Rising 26px would
                  offset every TOC jump by 26px until the heading revealed.
                */
                <h2
                  key={i}
                  id={`sec-${i}`}
                  data-reveal="fade"
                  style={{ fontSize: 26, marginTop: 40, scrollMarginTop: HEADING_OFFSET }}
                >
                  {withInlineLinks(block.text)}
                </h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote
                  key={i}
                  data-reveal="up"
                  style={{
                    margin: '32px 0',
                    padding: '20px 28px',
                    borderLeft: `3px solid ${ACCENT.color}`,
                    background: 'rgb(var(--fg-rgb) / 0.04)',
                    borderRadius: '0 14px 14px 0',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: 'rgb(var(--fg-rgb))',
                    lineHeight: 1.5,
                  }}
                >
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p key={i} data-reveal="up">
                {withInlineLinks(block.text)}
              </p>
            );
          })}
        </div>

        <div className="saffron-divider" style={{ margin: '48px 0' }} />

        {/*
          A reader who just finished a post overwhelmingly wants the next one,
          so that gets the weight and shows the real article — title, category,
          length — rather than a generic "Next article" button they can't judge.
          The product and home links stay, but as quiet text so they no longer
          compete with it.

          `inert` until revealed keeps the hidden links out of the tab order and
          the a11y tree (they're opacity:0 / pointer-events:none in CSS).
        */}
        <div ref={endRef} className={`blog-end${ended ? ' is-ended' : ''}`} inert={!ended}>
          {next.slug !== post.slug && (
            <>
              <div className="blog-end-eyebrow">Next article</div>
              <Link href={`/blog/${next.slug}`} className="blog-end-next">
                <div className="blog-end-next-top">
                  <CatChip post={next} />
                  <span className="blog-end-next-time">{next.readTime}</span>
                </div>
                <h3 className="blog-end-next-title">{next.title}</h3>
                <p className="blog-end-next-excerpt">{next.excerpt}</p>
                <span className="blog-end-next-read">
                  Read article <ArrowRight width={14} height={14} />
                </span>
              </Link>
            </>
          )}
          <div className="blog-end-more">
            {/* Routes to the App Store / Play Store per platform once those
                listings are live, otherwise opens the download modal. */}
            <SakhaCta className="btn btn-ghost blog-end-btn">
              Talk to Sakha <ArrowRight width={15} height={15} />
            </SakhaCta>
            <Link href="/" className="btn btn-secondary blog-end-btn">
              Explore Margadeshaka <ArrowRight width={15} height={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
