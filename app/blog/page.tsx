import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import CosmicLayer from '../components/CosmicLayer';
import SiteFooter from '../components/SiteFooter';
import SEOStructuredData from '../components/SEOStructuredData';
import BlogListing from '../components/blog/BlogListing';

const description =
  'Notes from the path — engineering, philosophy, and lessons on building AI that guides without deciding for you. Written by the founder of Margadeshaka.';

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'Blog — Notes from the path | Margadeshaka',
    description,
    url: '/blog',
    images: [{ url: '/images/chakra.png', width: 1200, height: 630, alt: 'The Margadeshaka Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Notes from the path | Margadeshaka',
    description,
    images: ['/images/chakra.png'],
  },
};

export default function BlogPage() {
  return (
    <>
      <CosmicLayer />
      <Navbar />

      <main className="relative pt-32 pb-20 cosmic-bg min-h-screen">
        <BlogListing />
      </main>

      <SiteFooter />
      <SEOStructuredData
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ]}
      />
    </>
  );
}
