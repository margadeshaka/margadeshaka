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
          : 'Learn about Margadeshaka AI features and benefits.'
      }
    }))
  };

  // Organization structured data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Margadeshaka AI',
    alternateName: 'Conscious AI Companion',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.ai',
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.ai'}/images/chakra.png`,
      width: '400',
      height: '400'
    },
    description: 'Margadeshaka AI is your conscious companion designed to listen deeply, reflect wisely, and guide you toward clarity.',
    foundingDate: '2025',
    keywords: 'conscious AI, spiritual AI, emotional support, mindfulness, reflection, clarity, wellness AI',
    sameAs: [
      // Add social media URLs when available
    ]
  };

  // Service structured data
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Conscious AI Companion',
    description: 'Deep listening, emotional understanding, and wise reflection through AI technology',
    provider: {
      '@type': 'Organization',
      name: 'Margadeshaka AI'
    },
    serviceType: 'AI Companion Service',
    category: 'Wellness Technology',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
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
          __html: JSON.stringify(serviceData)
        }}
      />
    </>
  );
}