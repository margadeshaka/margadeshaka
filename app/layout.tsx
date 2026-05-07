import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"
import { Inter, Poppins, Noto_Serif_Devanagari } from 'next/font/google';
import PerformanceMonitor from './components/PerformanceMonitor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '700'],
  variable: '--font-noto-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com'),
  title: {
    default: 'Margadeshaka - AI for Guidance & Learning',
    template: '%s | Margadeshaka'
  },
  description: 'Home of Sakha, your AI Vedic astrology companion, and Dronacharya, the AI tutoring platform. Navigate life decisions and master new skills with AI.',
  keywords: [
    'AI startup',
    'Sakha',
    'Dronacharya',
    'AI astrology',
    'Vedic astrology AI',
    'AI learning platform',
    'AI tutoring',
    'AI education',
    'AI guidance',
    'birth chart AI',
    'personalized learning',
    'AI companion',
    'AI certification',
    'interactive learning'
  ],
  authors: [{ name: 'Hitesh Gupta', url: process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com' }],
  creator: 'Margadeshaka',
  publisher: 'Margadeshaka',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Margadeshaka',
    title: 'Margadeshaka - AI for Guidance & Learning',
    description: 'Home of Sakha, your AI Vedic astrology companion, and Dronacharya, the AI tutoring platform.',
    images: [
      {
        url: '/images/chakra.png',
        width: 1200,
        height: 630,
        alt: 'Margadeshaka - AI for Guidance & Learning',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MargadeshakaAI',
    creator: '@hiteshgupta3012',
    title: 'Margadeshaka - AI for Guidance & Learning',
    description: 'Home of Sakha, your AI Vedic astrology companion, and Dronacharya, the AI tutoring platform.',
    images: ['/images/chakra.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  category: 'Technology',
  classification: 'AI Products, EdTech, AI Guidance, AI Learning',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark light',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Margadeshaka AI',
    'application-name': 'Margadeshaka AI',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Margadeshaka',
    alternateName: 'AI for Guidance & Learning',
    description: 'Home of Sakha, your AI Vedic astrology companion, and Dronacharya, the AI tutoring platform. Navigate life decisions and master new skills with AI.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com',
    founder: {
      '@type': 'Person',
      name: 'Hitesh Gupta',
      jobTitle: 'Founder & CEO'
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Vedic Astrology',
      'EdTech',
      'Multi-Agent AI Systems'
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'Sakha',
          description: 'AI-powered Vedic astrology companion',
          applicationCategory: 'LifestyleApplication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'Dronacharya',
          description: 'AI-powered learning platform with multi-agent tutoring',
          applicationCategory: 'EducationalApplication'
        }
      }
    ],
    keywords: 'AI startup, Sakha, Dronacharya, AI astrology, AI learning, multi-agent AI, EdTech',
    sameAs: [
      'https://twitter.com/MargadeshakaAI'
    ]
  };

  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable} ${notoDevanagari.variable}`}>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com'} />
        
        {/* Favicon links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="/images/chakra.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/chakra.png" as="image" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="flex-grow contain-layout">
          {children}
          <Analytics />
          <PerformanceMonitor />
        </div>
        <footer className="w-full py-6 text-center text-amber-200/50 bg-black/80 backdrop-blur-sm border-t border-amber-800/20" role="contentinfo" aria-label="Footer">
          <div className="container mx-auto">
            <nav aria-label="Footer navigation" className="mb-4">
              <ul className="flex justify-center space-x-6 text-sm">
                <li><a href="https://sakha.live" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors" aria-label="Visit Sakha app">Sakha</a></li>
                <li><span className="text-amber-200/30 cursor-default" aria-label="Dronacharya — Coming Soon">Dronacharya</span></li>
                <li><a href="#mission" className="hover:text-amber-300 transition-colors" aria-label="Our mission and values">Mission</a></li>
                <li><a href="#features" className="hover:text-amber-300 transition-colors" aria-label="Learn about our products">Products</a></li>
              </ul>
            </nav>
            <div className="text-center">
              <p className="mb-2 text-amber-200/60">&copy; 2026 Margadeshaka</p>
              <p className="text-sm italic text-amber-200/40 mb-2">&quot;Navigate life decisions. Master new skills.&quot;</p>
              <p className="text-xs text-amber-200/30">Home of Sakha & Dronacharya &bull; Built in India</p>
            </div>
          </div>
        </footer>
        <noscript>
          <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50">
            <div className="text-center">
              <h1 className="text-2xl mb-4">JavaScript Required</h1>
              <p>Please enable JavaScript to experience Margadeshaka AI.</p>
            </div>
          </div>
        </noscript>
      </body>
    </html>
  );
}