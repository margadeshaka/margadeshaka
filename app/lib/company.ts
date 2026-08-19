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
  mcaVerifyUrl: 'https://www.mca.gov.in/',
  mcaVerifyLabel: 'mca.gov.in (search by CIN)',

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
    verifyUrl: 'https://www.startupindia.gov.in/',
    verifyLabel: 'startupindia.gov.in',
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

  // Contact — single inbox for all roles
  contact: {
    email: 'contact@margadeshaka.com',
    supportEmail: 'contact@margadeshaka.com',
    securityEmail: 'contact@margadeshaka.com',
  },

  // Founder
  founder: {
    name: 'Hitesh Gupta',
    role: 'Founder & CEO',
    linkedin: 'https://www.linkedin.com/in/hiteshgupta3012/',
    github: 'https://github.com/ihiteshgupta',
  },

  // Team — rendered as the constellation thread on the home page.
  // Order matters: it maps to the fixed node positions in TeamSection.
  team: [
    {
      name: 'Hitesh Gupta',
      role: 'Director',
      initials: 'HG',
      bio: "Sets the vision for Margadeshaka — building AI that helps people think more clearly, rooted in Indian wisdom traditions.",
    },
    {
      name: 'Komal Chauhan',
      role: 'Co Founder',
      initials: 'KC',
      bio: "Shapes the product and the company's soul, making sure every experience feels genuinely human and compassionate.",
    },
    {
      name: 'Rohit Kumar',
      role: 'Software Engineer',
      initials: 'RK',
      bio: 'Brings Sakha to life across iOS, Android, and Web — turning thoughtful design into reliable, calm technology.',
    },
    {
      name: 'Vanshika Garg',
      role: 'Marketing Executive',
      initials: 'VG',
      bio: "Tells Margadeshaka's story with clarity and warmth, connecting the product with the people it's meant to serve.",
    },
  ],

  // External / web presence
  web: {
    site: 'https://margadeshaka.com',
    sakha: 'https://sakha.live',
    twitter: 'https://twitter.com/MargadeshakaAI',
    /*
     * Company LinkedIn page — distinct from `founder.linkedin`, which is
     * Hitesh's personal profile and belongs only in the Person JSON-LD.
     */
    linkedin: 'https://www.linkedin.com/company/margadeshaka/',
    /*
     * Handle is `margadeshaka.ai` (the earlier `margadeshaka` was wrong).
     * The `?igsh=…&utm_source=qr` params on the shared link are QR-share
     * attribution — deliberately stripped, or every click from the site would
     * be logged as coming from a QR scan.
     */
    instagram: 'https://www.instagram.com/margadeshaka.ai',
    githubOrg: 'https://github.com/margadeshaka',
  },
} as const;

/**
 * Sakha app-store routing — single source of truth.
 *
 * Leave a URL empty until that listing is actually live. Every "Try Sakha" /
 * download action reads these: on a matching device with a live URL we deep
 * link to the store, otherwise we open the download modal, which shows
 * "Coming soon" for whichever store is still empty.
 */
/**
 * Sakha's live store listings.
 *
 * An empty string here is meaningful: it makes the download modal render
 * "Coming soon to <store>" and disables the badge, and it makes `openSakha`
 * fall back to that modal instead of deep-linking. Both apps have shipped, so
 * both are populated — blanking one would silently regress it to "coming soon".
 *
 * The App Store link uses the region-neutral /app/id<trackId> form so Apple
 * redirects each visitor to their own storefront rather than pinning everyone
 * to /in/. trackId 6759238766 = "Sakha — AI Wellness Companion"; the Play id is
 * the Android applicationId from android/app/build.gradle.kts.
 */
export const sakhaStore = {
  appStore: 'https://apps.apple.com/app/id6759238766',
  playStore: 'https://play.google.com/store/apps/details?id=com.margadeshaka.sakha',
} as const;

export type Company = typeof company;

/**
 * True when a blog byline belongs to the founder. The byline disc, the role
 * line, and the BlogPosting JSON-LD jobTitle/url all key off this one
 * exact-string comparison — keep the check here so the three call sites can't
 * drift apart.
 */
export function isFounder(authorName: string): boolean {
  return authorName === company.founder.name;
}
