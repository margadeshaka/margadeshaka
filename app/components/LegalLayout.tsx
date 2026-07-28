import Link from 'next/link';
import { ReactNode } from 'react';
import SEOStructuredData from './SEOStructuredData';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  /** Slug used for the breadcrumb item (e.g. 'privacy', 'terms'). */
  slug: string;
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, slug, children }: LegalLayoutProps) {
  return (
    <>
      <div className="relative pt-32 pb-20 cosmic-bg min-h-screen">
        <div className="container-prose">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-gold text-sm mb-8 hover:text-brand-gold-light transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <header className="mb-10 pb-7 border-b border-white/[0.08]">
            <span className="eyebrow">Legal</span>
            <h1
              className="font-display text-white mt-3"
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <p className="mt-3 text-white/55 text-sm">Last updated · {lastUpdated}</p>
          </header>

          <article className="legal-prose">{children}</article>
        </div>
      </div>
      <SEOStructuredData
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: title, href: `/${slug}` },
        ]}
      />
    </>
  );
}
