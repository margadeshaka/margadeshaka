import { company } from '../lib/company';

// Defensive trim — an env var piped in from a shell or a CI secret can carry a
// trailing newline, which silently corrupts every URL/@id derived from baseUrl.
const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || company.web.site).trim();

interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  author?: string;
}

interface SEOStructuredDataProps {
  /** Optional breadcrumb trail. Pass on subpages. */
  breadcrumbs?: Array<{ name: string; href: string }>;
  /** Emit BlogPosting JSON-LD for a single article page. */
  article?: BlogPostMeta;
  /** Emit a Blog collection node for the /blog listing page. */
  blog?: { posts: BlogPostMeta[] };
}

export default function SEOStructuredData({ breadcrumbs, article, blog }: SEOStructuredDataProps = {}) {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: company.brand,
    legalName: company.legalNameTitleCase,
    alternateName: 'AI for Guidance & Learning',
    url: baseUrl,
    // Google wants a square-ish logo, min 112px. /icon.png is the brand mark at
    // 1024². The old value pointed at chakra.png (ChakraVision-era art) and
    // declared 400×400, which that file never was.
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/icon.png`,
      width: '1024',
      height: '1024',
    },
    description:
      'Margadeshaka AI Private Limited — DPIIT-recognised AI startup building products that combine Indian wisdom traditions with modern multi-agent AI. Home of Sakha (AI companion for emotional clarity) and Dronacharya (AI tutoring platform).',
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
      'Emotional Wellness',
      'EdTech',
      'Conversational AI',
    ],
    keywords:
      'Sakha, Dronacharya, AI wellness companion, emotional support AI, AI tutoring, multi-agent AI, India AI startup, DPIIT recognised startup',
    // The organisation's own profiles. LinkedIn and Instagram are the two
    // Google most reliably surfaces in a knowledge panel, so both belong here.
    sameAs: [
      company.web.sakha,
      company.web.linkedin,
      company.web.instagram,
      company.web.twitter,
      company.web.githubOrg,
    ],
  };

  const sakhaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sakha',
    description:
      'AI companion for emotional clarity: daily check-ins and reflection, relationship guidance, and emotionally aware coaching.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    provider: { '@id': `${baseUrl}#organization` },
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
    provider: { '@id': `${baseUrl}#organization` },
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
          text: 'Margadeshaka AI Private Limited is a DPIIT-recognised Indian AI startup (DIPP215241) building AI products that combine Indian wisdom traditions with modern multi-agent AI systems. Our products include Sakha (AI companion for emotional clarity) and Dronacharya (AI learning platform).',
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
          text: 'Sakha is an AI companion for emotional clarity. It gets to know who you are and provides emotionally aware coaching and personalized guidance on relationships and decisions. Available in beta on iOS, Android, and at sakha.live.',
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

  // WebSite — enables Google sitelinks search box (when search is added).
  // Even without search, advertising it as a SearchAction is recommended by
  // Google's structured data guidelines.
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    name: company.brand,
    alternateName: company.legalNameTitleCase,
    url: baseUrl,
    inLanguage: 'en',
    publisher: { '@id': `${baseUrl}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // LocalBusiness — improves India local search; based on the registered office
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${baseUrl}#business`,
    name: company.legalNameTitleCase,
    image: `${baseUrl}/images/og-margadeshaka.png`,
    url: baseUrl,
    email: company.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.registeredOffice.line1}, ${company.registeredOffice.line2}`,
      addressLocality: company.registeredOffice.city,
      addressRegion: company.registeredOffice.state,
      postalCode: company.registeredOffice.postalCode,
      addressCountry: company.registeredOffice.countryCode,
    },
    priceRange: '₹₹',
    foundingDate: company.incorporationDate,
  };

  // Brand
  const brandData = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: company.brand,
    logo: `${baseUrl}/icon.png`,
    description: 'AI for guidance and learning. The Margadeshaka brand family includes Sakha and Dronacharya.',
  };

  // BreadcrumbList — only when caller provides
  const breadcrumbData = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.href.startsWith('http') ? b.href : `${baseUrl}${b.href}`,
        })),
      }
    : null;

  // Blog — collection node for the /blog listing
  const blogData = blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${baseUrl}/blog#blog`,
        name: 'The Margadeshaka Blog',
        description:
          'Engineering, philosophy, and the occasional wrong turn — how Margadeshaka builds AI that guides without deciding for you.',
        url: `${baseUrl}/blog`,
        inLanguage: 'en',
        publisher: { '@id': `${baseUrl}#organization` },
        blogPost: blog.posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.excerpt,
          datePublished: new Date(p.date).toISOString(),
          url: `${baseUrl}/blog/${p.slug}`,
        })),
      }
    : null;

  // BlogPosting — single article
  const articleData = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${baseUrl}/blog/${article.slug}#article`,
        headline: article.title,
        description: article.excerpt,
        datePublished: new Date(article.date).toISOString(),
        dateModified: new Date(article.date).toISOString(),
        ...(article.category ? { articleSection: article.category } : {}),
        author: {
          '@type': 'Person',
          name: article.author || company.founder.name,
          jobTitle: company.founder.role,
          sameAs: [company.founder.linkedin, company.founder.github],
        },
        publisher: { '@id': `${baseUrl}#organization` },
        mainEntityOfPage: `${baseUrl}/blog/${article.slug}`,
        isPartOf: { '@id': `${baseUrl}/blog#blog` },
        inLanguage: 'en',
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sakhaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dronacharyaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      {breadcrumbData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      )}
      {blogData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogData) }} />
      )}
      {articleData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
      )}
    </>
  );
}
