import './globals.css';
import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Newsreader, Geist, Geist_Mono, Noto_Serif_Devanagari } from 'next/font/google';
import PerformanceMonitor from './components/PerformanceMonitor';
import CosmicEffects from './components/CosmicEffects';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import SiteFooter from './components/SiteFooter';
import SakhaStoreModal from './components/SakhaStoreModal';
import CosmicLayer from './components/CosmicLayer';
import ScrollReveal from './components/ScrollReveal';

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

// Type stack from the claude.ai/design handoff: Newsreader for display,
// Geist for body/UI, Noto Serif Devanagari for Sanskrit, Geist Mono for
// registration numbers. Self-hosted by next/font so there is no blocking
// request to fonts.googleapis.com like the prototype had.
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display-src',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body-src',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono-src',
  display: 'swap',
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari-src',
  display: 'swap',
});

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com').trim();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Margadeshaka — AI for Guidance & Learning',
    template: '%s | Margadeshaka',
  },
  description:
    'DPIIT-recognised AI startup from India building Sakha (AI companion for emotional clarity) and Dronacharya (AI tutoring). Multi-agent AI rooted in Indian wisdom traditions.',
  keywords: [
    'AI startup',
    'Sakha',
    'Dronacharya',
    'Margadeshaka',
    'AI wellness companion',
    'emotional support AI',
    'AI learning platform',
    'AI tutoring',
    'multi-agent AI',
    'India AI startup',
  ],
  authors: [{ name: 'Hitesh Gupta', url: baseUrl }],
  creator: 'Margadeshaka',
  publisher: 'Margadeshaka',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Margadeshaka',
    title: 'Margadeshaka — AI for Guidance & Learning',
    description:
      'Margadeshaka builds AI products that combine Indian wisdom traditions with modern multi-agent systems. Home of Sakha and Dronacharya.',
    images: [
      {
        url: '/images/og-margadeshaka.png',
        width: 1200,
        height: 630,
        alt: 'Margadeshaka — AI for Guidance & Learning',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MargadeshakaAI',
    creator: '@hiteshgupta3012',
    title: 'Margadeshaka — AI for Guidance & Learning',
    description: 'AI products that combine Indian wisdom with modern AI. Home of Sakha & Dronacharya.',
    images: ['/images/og-margadeshaka.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      // Explicit India targeting helps Google rank us in google.co.in.
      // x-default is the fallback for unmatched locales.
      'en-IN': '/',
      'en': '/',
      'x-default': '/',
    },
  },
  category: 'Technology',
  classification: 'AI Products, EdTech, AI Guidance, AI Learning',
  verification: {
    // Add Search Console / Bing Webmaster verification tokens here when issued.
    // google: 'paste-token-from-search-console-here',
    // other: { 'msvalidate.01': 'paste-token-from-bing-webmaster' },
  },
};

export const viewport: Viewport = {
  /*
   * themeColor and colorScheme deliberately omitted (MAR-545): both are baked
   * into the export at build time and cannot follow a runtime toggle. If Next
   * emitted its own theme-color meta we would end up with two, and the boot
   * script would update the wrong one. The tag is written by hand in <head>
   * below and kept in step by ThemeToggle; colorScheme is set in CSS, on
   * :root and :root[data-theme='light'].
   */
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable} ${notoDevanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Applies the stored theme BEFORE first paint. A synchronous inline
          script in <head> blocks parsing, which is the only way to avoid a
          flash of the wrong theme on a static export — there is no server to
          read a cookie and no React effect runs early enough.

          Keep in sync with ThemeToggle: same key, same values, and dark is the
          absence of the attribute. The validity check means a corrupted stored
          value falls back to the OS preference instead of silently forcing
          dark. try/catch covers Safari private mode, where reads can throw.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('md-theme');" +
              "if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}" +
              "if(t==='light')document.documentElement.dataset.theme='light';" +
              // Created here rather than rendered as JSX: React would re-render
              // its own copy after this script had already set the value,
              // leaving two theme-color tags disagreeing with each other.
              "var m=document.createElement('meta');m.name='theme-color';" +
              "m.content=(t==='light'?'#F4EFE7':'#06050F');" +
              "document.head.appendChild(m);}catch(e){}})();",
          }}
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <CosmicLayer />
        <CosmicEffects />
        {/* Arms the [data-reveal] system for every route. Renders nothing. */}
        <ScrollReveal />
        <Navbar />
        <main id="main" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <SiteFooter />
        <SakhaStoreModal />
        <ScrollToTop />
        <PerformanceMonitor />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
