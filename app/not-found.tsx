import Link from 'next/link';

/**
 * 404 page.
 *
 * The handoff renders a styled "Article not found" state for an unknown
 * /blog/<slug> (blog.jsx:223-232) — cosmic background, a large heading, an
 * explanatory line and a ghost "back" button. In a Next static export an
 * unknown route can't be handled inside the article component, so that state
 * lives here instead and covers every unmatched path, not just blog slugs.
 *
 * Without this, Next serves its stock white 404 with none of the site chrome.
 */
export default function NotFound() {
  return (
    <div
      className="page-enter cosmic-bg relative min-h-screen pb-20"
      style={{ paddingTop: 160, textAlign: 'center' }}
    >
      <div className="container-narrow" style={{ position: 'relative', padding: '0 24px' }}>
        <p
          className="eyebrow"
          style={{ justifyContent: 'center', display: 'inline-flex', marginBottom: 14 }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#fff',
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
          }}
        >
          This page isn&rsquo;t on the path
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            marginTop: 14,
            marginBottom: 32,
            fontSize: 17,
            lineHeight: 1.6,
          }}
        >
          It may have moved, or never been published yet.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/blog" className="btn btn-ghost">
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  );
}
