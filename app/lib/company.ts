/**
 * Single source of truth for Margadeshaka company information.
 * All public-facing legal credentials, addresses, and identifiers live here.
 *
 * Source documents (kept in /public/certificates/):
 *  - Certificate of Incorporation issued by MCA (CIN, PAN, TAN)
 *  - DPIIT / Startup India recognition certificate (DIPP number)
 */
export const company = {
  // Display name (brand)
  brand: 'Margadeshaka',

  // Legal entity (as it appears on government records)
  legalName: 'MARGADESHAKA AI PRIVATE LIMITED',
  legalNameTitleCase: 'Margadeshaka AI Private Limited',
  entityType: 'Private Limited Company',
  jurisdiction: 'India',

  // Ministry of Corporate Affairs (MCA) identifiers
  cin: 'U85499PB2025PTC063772',
  pan: 'AATCM0561A',
  tan: 'PTLM20055A',
  incorporationDate: '2025-03-04',
  incorporationDateHuman: '4 March 2025',
  incorporationCertUrl: '/certificates/incorporation-certificate.pdf',
  mcaVerifyUrl: 'https://www.mca.gov.in/mcafoportal/viewCompanyMasterData.do',

  // DPIIT / Startup India recognition
  dpiit: {
    number: 'DIPP215241',
    issuedDate: '2025-08-05',
    issuedDateHuman: '5 August 2025',
    validUntilDate: '2035-03-03',
    validUntilHuman: '3 March 2035',
    industry: 'AI',
    sector: 'Others',
    certUrl: '/certificates/dpiit-recognition-certificate.pdf',
    verifyUrl: 'https://www.startupindia.gov.in/content/sih/en/recognised-startup.html',
  },

  // Trademark
  trademark: {
    status: 'applied' as const,
    statusHuman: 'Application filed (pending grant)',
    mark: 'Margadeshaka',
    symbol: '™',
  },

  // Registered office (matches MCA records)
  registeredOffice: {
    line1: 'Flat 1403, T-7, Sushma Grande',
    line2: 'Zirakpur, Rajpura',
    city: 'Mohali',
    state: 'Punjab',
    postalCode: '140603',
    country: 'India',
    countryCode: 'IN',
    full: 'Flat 1403, T-7, Sushma Grande, Zirakpur, Rajpura, Mohali — 140603, Punjab, India',
  },

  // Contact
  contact: {
    email: 'founder@margadeshaka.com',
    supportEmail: 'support@margadeshaka.com',
    securityEmail: 'security@margadeshaka.com',
  },

  // Founder
  founder: {
    name: 'Hitesh Gupta',
    role: 'Founder & CEO',
    linkedin: 'https://www.linkedin.com/in/hiteshgupta3012/',
    github: 'https://github.com/ihiteshgupta',
  },

  // External / web presence
  web: {
    site: 'https://margadeshaka.com',
    sakha: 'https://sakha.live',
    twitter: 'https://twitter.com/MargadeshakaAI',
    githubOrg: 'https://github.com/margadeshaka',
  },
} as const;

export type Company = typeof company;
