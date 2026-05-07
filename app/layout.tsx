import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Margadeshaka — AI for Guidance & Learning',
    template: '%s | Margadeshaka',
  },
  description:
    'Margadeshaka builds AI products that combine Indian wisdom traditions with modern multi-agent systems. Home of Sakha (Vedic astrology companion) and Dronacharya (AI tutoring platform).',
  keywords: [
    'AI startup',
    'Sakha',
    'Dronacharya',
    'Margadeshaka',
    'AI astrology',
    'Vedic astrology AI',
    'AI learning platform',
    'AI tutoring',
    'multi-agent AI',
    'birth chart AI',
    'India AI startup',
  ],
  authors: [{ name: 'Hitesh Gupta', url: baseUrl }],
  creator: 'Margadeshaka',
  publisher: 'Margadeshaka',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Margadeshaka',
    title: 'Margadeshaka — AI for Guidance & Learning',
    description:
      'Margadeshaka builds AI products that combine Indian wisdom traditions with modern multi-agent systems. Home of Sakha and Dronacharya.',
    images: [
      {
        url: '/images/chakra.png',
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
    images: ['/images/chakra.png'],
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
  alternates: { canonical: '/' },
  category: 'Technology',
  classification: 'AI Products, EdTech, AI Guidance, AI Learning',
};

export const viewport: Viewport = {
  themeColor: '#06050F',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${poppins.variable} ${notoDevanagari.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <PerformanceMonitor />
      </body>
    </html>
  );
}
