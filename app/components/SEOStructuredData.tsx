import { company } from '../lib/company';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || company.web.site;

export default function SEOStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.brand,
    legalName: company.legalNameTitleCase,
    alternateName: 'AI for Guidance & Learning',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/chakra.png`,
      width: '400',
      height: '400',
    },
    description:
      'Margadeshaka AI Private Limited — DPIIT-recognised AI startup building products that combine Indian wisdom traditions with modern multi-agent AI. Home of Sakha (Vedic astrology companion) and Dronacharya (AI tutoring platform).',
    foundingDate: company.incorporationDate,
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: company.registeredOffice.city,
        addressRegion: company.registeredOffice.state,
        addressCountry: company.registeredOffice.countryCode,
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.registeredOffice.line1}, ${company.registeredOffice.line2}`,
      addressLocality: company.registeredOffice.city,
      addressRegion: company.registeredOffice.state,
      postalCode: company.registeredOffice.postalCode,
      addressCountry: company.registeredOffice.countryCode,
    },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'CIN', value: company.cin },
      { '@type': 'PropertyValue', propertyID: 'PAN', value: company.pan },
      { '@type': 'PropertyValue', propertyID: 'DPIIT', value: company.dpiit.number },
    ],
    taxID: company.pan,
    founder: {
      '@type': 'Person',
      name: company.founder.name,
      jobTitle: company.founder.role,
      sameAs: [company.founder.linkedin, company.founder.github],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: company.contact.email,
        availableLanguage: ['English', 'Hindi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'security',
        email: company.contact.securityEmail,
      },
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Multi-Agent AI Systems',
      'Vedic Astrology',
      'EdTech',
      'Conversational AI',
    ],
    keywords:
      'Sakha, Dronacharya, AI astrology, Vedic astrology AI, AI tutoring, multi-agent AI, India AI startup, DPIIT recognised startup',
    sameAs: [company.web.sakha, company.web.twitter, company.web.githubOrg],
  };

  const sakhaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sakha',
    description:
      'AI Vedic astrology companion: birth chart analysis, Vimshottari Dasha predictions, relationship compatibility, and emotionally aware coaching.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    provider: { '@type': 'Organization', name: company.brand, url: baseUrl },
    url: company.web.sakha,
  };

  const dronacharyaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dronacharya',
    description:
      'Interactive AI tutoring platform with multi-agent AI tutors, adaptive difficulty, and project-based Bronze, Silver, and Gold certifications.',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    provider: { '@type': 'Organization', name: company.brand, url: baseUrl },
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
          text: 'Margadeshaka AI Private Limited is a DPIIT-recognised Indian AI startup (DIPP215241) building AI products that combine Indian wisdom traditions with modern multi-agent AI systems. Our products include Sakha (Vedic astrology companion) and Dronacharya (AI learning platform).',
        },
      },
      {
        '@type': 'Question',
        name: 'When was Margadeshaka incorporated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Margadeshaka AI Private Limited was incorporated on ${company.incorporationDateHuman} under the Companies Act, 2013. CIN: ${company.cin}.`,
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
        name: 'Where is Margadeshaka registered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Registered office: ${company.registeredOffice.full}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do I contact Margadeshaka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Email ${company.contact.email} for product, partnership, press, or hiring inquiries.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sakhaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dronacharyaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
