import type { Metadata } from 'next';
import SEOStructuredData from '../components/SEOStructuredData';
import BlogListing from '../components/blog/BlogListing';
import { ROUTES } from '../lib/routes';

const description =
  'Notes from the path — reflections on emotional wellbeing, engineering, and lessons on building AI that guides without deciding for you, from the Margadeshaka team.';

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: ROUTES.blog },
  openGraph: {
    type: 'website',
    title: 'Blog — Notes from the path | Margadeshaka',
    description,
    url: ROUTES.blog,
    images: [{ url: '/images/og-margadeshaka.png', width: 1200, height: 630, alt: 'The Margadeshaka Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Notes from the path | Margadeshaka',
    description,
    images: ['/images/og-margadeshaka.png'],
  },
};

export default function BlogPage() {
  return (
    <>

      {/* BlogListing owns its own padding and cosmic-bg, per the handoff. */}
      <BlogListing />

      <SEOStructuredData
        breadcrumbs={[
          { name: 'Home', href: ROUTES.home },
          { name: 'Blog', href: ROUTES.blog },
        ]}
      />
    </>
  );
}
