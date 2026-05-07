const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://margadeshaka.com';

export default function SEOStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Margadeshaka',
    alternateName: 'AI for Guidance & Learning',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/chakra.png`,
      width: '400',
      height: '400',
    },
    description:
      'Margadeshaka builds AI products that combine Indian wisdom traditions with modern multi-agent AI. Home of Sakha (Vedic astrology companion) and Dronacharya (AI tutoring platform).',
    foundingDate: '2025',
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    },
    founder: {
      '@type': 'Person',
      name: 'Hitesh Gupta',
      jobTitle: 'Founder & CEO',
      sameAs: [
        'https://www.linkedin.com/in/hiteshgupta3012/',
        'https://github.com/ihiteshgupta',
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'founder@margadeshaka.com',
      availableLanguage: ['English', 'Hindi'],
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Multi-Agent AI Systems',
      'Vedic Astrology',
      'EdTech',
      'Conversational AI',
    ],
    keywords:
      'Sakha, Dronacharya, AI astrology, Vedic astrology AI, AI tutoring, multi-agent AI, India AI startup',
    sameAs: [
      'https://sakha.live',
      'https://twitter.com/MargadeshakaAI',
      'https://github.com/margadeshaka',
    ],
  };

  const sakhaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sakha',
    description:
      'AI Vedic astrology companion: birth chart analysis, Vimshottari Dasha predictions, relationship compatibility, and emotionally aware coaching.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    provider: { '@type': 'Organization', name: 'Margadeshaka', url: baseUrl },
    url: 'https://sakha.live',
  };

  const dronacharyaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dronacharya',
    description:
      'Interactive AI tutoring platform with multi-agent AI tutors, adaptive difficulty, and project-based Bronze, Silver, and Gold certifications.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    provider: { '@type': 'Organization', name: 'Margadeshaka', url: baseUrl },
    url: baseUrl,
  };

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does Margadeshaka do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Margadeshaka builds AI products that combine Indian wisdom traditions with modern multi-agent AI systems. We ship Sakha (Vedic astrology companion) on iOS, Android, and Web, and are developing Dronacharya (AI learning platform).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Sakha?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sakha is an AI Vedic astrology companion. It generates birth charts using Swiss Ephemeris with Lahiri Ayanamsa, computes Dasha periods and transits, and provides emotionally aware coaching. Available in beta on iOS, Android, and at sakha.live.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Dronacharya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dronacharya is an interactive AI tutoring platform in development. It uses multi-agent AI tutors and adaptive difficulty to teach by active thinking, with project-based certifications.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Margadeshaka based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Margadeshaka is based in India and operates as a remote-first team.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I contact Margadeshaka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Email founder@margadeshaka.com for product, partnership, press, or hiring inquiries.',
        },
      },
    ],
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
