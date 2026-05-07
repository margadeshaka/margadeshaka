import Link from 'next/link';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-20 px-6 cosmic-bg min-h-screen">
        <div className="stars" aria-hidden="true" />
        <article className="relative max-w-3xl mx-auto">
          <Link href="/" className="text-sm text-brand-gold hover:text-brand-gold-light transition-colors inline-flex items-center gap-1 mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <header className="mb-10 pb-8 border-b border-white/10">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">{title}</h1>
            <p className="text-sm text-white/50">Last updated: {lastUpdated}</p>
          </header>

          <div className="prose prose-invert max-w-none text-white/80 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-brand-gold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_a]:text-brand-gold [&_a:hover]:text-brand-gold-light [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
