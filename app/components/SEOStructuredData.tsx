'use client';

import { useChakra } from '../context/ChakraContext';

export default function SEOStructuredData() {
  const { chakraPoints } = useChakra();

  // Create FAQ structured data from chakra points
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: chakraPoints.map(point => ({
      '@type': 'Question',
      name: point.title.replace(/[✨💡🌿🔮👤❤️🌱🚀]/g, '').trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof point.description === 'string'
          ? point.description.replace(/\n/g, ' ').slice(0, 300)
          : 'Learn about Margadeshaka AI products and services.'
      }
    }))
  };

  // Organization structured data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Margadeshaka',
    alternateName: 'AI for Guidance & Learning',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com',
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com'}/images/chakra.png`,
      width: '400',
      height: '400'
    },
    description: 'Margadeshaka builds AI products that help you navigate life and master new skills. Home of Sakha (AI Vedic astrology companion) and Dronacharya (AI learning platform).',
    foundingDate: '2025',
    keywords: 'Sakha, Dronacharya, AI astrology, Vedic astrology AI, AI tutoring, AI learning platform, personalized learning',
    sameAs: [
      'https://twitter.com/MargadeshakaAI'
    ]
  };

  // Sakha product structured data
  const sakhaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sakha',
    description: 'AI-powered Vedic astrology companion offering birth chart analysis, relationship compatibility, auspicious timing, and emotional coaching.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    provider: {
      '@type': 'Organization',
      name: 'Margadeshaka'
    },
    url: 'https://sakha.live'
  };

  // Dronacharya product structured data
  const dronacharyaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dronacharya',
    description: 'Interactive AI learning platform with specialized AI tutors, adaptive difficulty, and project-based certifications. Learn by thinking, not watching.',
    applicationCategory: 'EducationalApplication',
    provider: {
      '@type': 'Organization',
      name: 'Margadeshaka'
    },
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sakhaData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dronacharyaData)
        }}
      />
    </>
  );
}
