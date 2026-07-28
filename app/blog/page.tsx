import type { Metadata } from 'next';
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

      {/* BlogListing owns its own padding and cosmic-bg, per the handoff. */}
      <BlogListing />

      <SEOStructuredData
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ]}
      />
    </>
  );
}
