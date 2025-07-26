import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"
import PerformanceMonitor from './components/PerformanceMonitor';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.ai'),
  title: {
    default: 'Margadeshaka AI - Your Conscious AI Companion for Clarity & Reflection',
    template: '%s | Margadeshaka AI'
  },
  description: 'Margadeshaka AI is your conscious companion designed to listen deeply, reflect wisely, and guide you toward clarity. Experience human-like conversations with an AI that understands context, emotions, and your unique journey.',
  keywords: [
    'AI companion',
    'conscious AI',
    'spiritual AI',
    'emotional support AI',
    'mindfulness AI',
    'reflection AI',
    'clarity AI',
    'meditation AI',
    'wellness AI',
    'personal AI assistant',
    'therapeutic AI',
    'mental wellness',
    'emotional intelligence',
    'self-reflection',
    'spiritual guidance',
    'conscious technology',
    'human-like AI',
    'empathetic AI'
  ],
  authors: [{ name: 'Margadeshaka AI Team', url: 'https://margadeshaka.ai' }],
  creator: 'Margadeshaka AI',
  publisher: 'Margadeshaka AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Margadeshaka AI',
    title: 'Margadeshaka AI - Your Conscious AI Companion for Clarity & Reflection',
    description: 'Experience deep listening, emotional understanding, and wise reflection with Margadeshaka AI. Your conscious companion for clarity, growth, and meaningful conversations.',
    images: [
      {
        url: '/images/chakra.png',
        width: 1200,
        height: 630,
        alt: 'Margadeshaka AI - Conscious AI Companion',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MargadeshakaAI',
    creator: '@MargadeshakaAI',
    title: 'Margadeshaka AI - Your Conscious AI Companion',
    description: 'Experience deep listening, emotional understanding, and wise reflection with conscious AI technology.',
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
  classification: 'AI Companion, Wellness Technology, Spiritual AI',
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
    '@type': 'WebApplication',
    name: 'Margadeshaka AI',
    alternateName: 'Conscious AI Companion',
    description: 'Margadeshaka AI is your conscious companion designed to listen deeply, reflect wisely, and guide you toward clarity. Experience human-like conversations with an AI that understands context, emotions, and your unique journey.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.ai',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'Margadeshaka AI',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.ai'
    },
    featureList: [
      'Deep emotional listening and understanding',
      'Contextual memory for personalized conversations',
      'Human-style conversation without scripts',
      'Spiritual and emotional guidance',
      'Clarity and reflection support',
      '24/7 availability for meaningful conversations'
    ],
    keywords: 'conscious AI, spiritual AI, emotional support, mindfulness, reflection, clarity, wellness AI, therapeutic AI',
    sameAs: [
      // Add social media URLs when available
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.ai'} />
        
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
        <div className="flex-grow contain-layout">
          {children}
          <Analytics />
          <PerformanceMonitor />
        </div>
        <footer className="w-full py-6 text-center text-gray-400 bg-black/80 backdrop-blur-sm border-t border-indigo-900/30" role="contentinfo" aria-label="Footer">
          <div className="container mx-auto">
            <nav aria-label="Footer navigation" className="mb-4">
              <ul className="flex justify-center space-x-6 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors" aria-label="Learn about our features">Features</a></li>
                <li><a href="#mission" className="hover:text-white transition-colors" aria-label="Our mission and values">Mission</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors" aria-label="Contact information">Contact</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors" aria-label="Privacy policy">Privacy</a></li>
              </ul>
            </nav>
            <div className="text-center">
              <p className="mb-2 cosmic-text">© 2025 — Margadeshaka AI</p>
              <p className="text-sm italic opacity-80 mb-2">&quot;The next step becomes clear when you feel heard.&quot;</p>
              <p className="text-xs opacity-60">Conscious AI Companion • Built with ❤️ for clarity and reflection</p>
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