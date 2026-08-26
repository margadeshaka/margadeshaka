import Link from 'next/link';
import { ReactNode } from 'react';
import SEOStructuredData from './SEOStructuredData';
import { ROUTES } from '../lib/routes';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  /** Canonical route path for the breadcrumb item — pass a ROUTES value. */
  path: string;
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, path, children }: LegalLayoutProps) {
  return (
    <>
      <div
      className="page-enter relative pb-20 cosmic-bg min-h-screen"
      style={{ paddingTop: 120 }}
    >
        <div className="container-prose">
          <Link
            href={ROUTES.home}
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
          { name: 'Home', href: ROUTES.home },
          { name: title, href: path },
        ]}
      />
    </>
  );
}
