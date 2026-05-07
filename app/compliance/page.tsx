import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { company } from '../lib/company';

export const metadata: Metadata = {
  title: 'Compliance & Legal',
  description:
    'Margadeshaka AI Private Limited — corporate identity, DPIIT Startup India recognition, trademark, and registered office. CIN U85499PB2025PTC063772.',
  alternates: { canonical: '/compliance' },
};

function CredentialRow({
  label,
  value,
  copy,
}: {
  label: string;
  value: string;
  copy?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3 border-b border-white/5 last:border-0">
      <dt className="text-sm text-white/60 uppercase tracking-wider">{label}</dt>
      <dd className="font-mono text-sm text-white break-all">
        {value}
        {copy && (
          <span className="ml-2 text-white/30 text-xs">(public record)</span>
        )}
      </dd>
    </div>
  );
}

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-20 px-6 cosmic-bg min-h-screen">
        <div className="stars" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-sm text-brand-gold hover:text-brand-gold-light transition-colors inline-flex items-center gap-1 mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <header className="mb-12 pb-8 border-b border-white/10">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              Compliance &amp; Legal
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Corporate identity &amp; recognition
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl">
              {company.legalNameTitleCase} is a Private Limited Company incorporated under the
              Companies Act, 2013, and a DPIIT-recognised startup under the Government of India&apos;s
              Startup India initiative.
            </p>
          </header>

          {/* Company identity */}
          <section aria-labelledby="company-heading" className="mb-12">
            <h2 id="company-heading" className="font-display text-2xl font-semibold text-white mb-6">
              Company identity
            </h2>
            <div className="glass-card-elevated p-6 sm:p-8">
              <dl>
                <CredentialRow label="Legal name" value={company.legalNameTitleCase} />
                <CredentialRow label="Entity type" value={company.entityType} />
                <CredentialRow label="Jurisdiction" value={company.jurisdiction} />
                <CredentialRow label="Date of incorporation" value={company.incorporationDateHuman} />
                <CredentialRow label="CIN" value={company.cin} copy />
                <CredentialRow label="PAN" value={company.pan} copy />
                <CredentialRow label="TAN" value={company.tan} copy />
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={company.incorporationCertUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm py-2 px-4"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                  View Certificate of Incorporation (PDF)
                </a>
                <a
                  href={company.mcaVerifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-sm py-2 px-4"
                >
                  Verify on MCA portal
                </a>
              </div>
            </div>
          </section>

          {/* DPIIT Recognition */}
          <section aria-labelledby="dpiit-heading" className="mb-12">
            <h2 id="dpiit-heading" className="font-display text-2xl font-semibold text-white mb-6">
              Startup India recognition
            </h2>
            <div className="glass-card glass-card-accent p-6 sm:p-8 relative overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-radial from-brand-gold/20 via-brand-gold/5 to-transparent blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-sm text-white/60 mb-6">
                  Issued by the <strong className="text-white/80">Department for Promotion of Industry and Internal Trade (DPIIT)</strong>,
                  Ministry of Commerce &amp; Industry, Government of India. This certificate is publicly
                  verifiable on{' '}
                  <a
                    href="https://www.startupindia.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold underline underline-offset-2 hover:text-brand-gold-light"
                  >
                    startupindia.gov.in
                  </a>
                  .
                </p>
                <dl>
                  <CredentialRow label="Certificate number" value={company.dpiit.number} copy />
                  <CredentialRow label="Date of issue" value={company.dpiit.issuedDateHuman} />
                  <CredentialRow label="Valid until" value={company.dpiit.validUntilHuman} />
                  <CredentialRow label="Industry" value={company.dpiit.industry} />
                  <CredentialRow label="Sector" value={company.dpiit.sector} />
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={company.dpiit.certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-4"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                    View DPIIT Certificate (PDF)
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Trademark */}
          <section aria-labelledby="trademark-heading" className="mb-12">
            <h2 id="trademark-heading" className="font-display text-2xl font-semibold text-white mb-6">
              Trademark
            </h2>
            <div className="glass-card p-6 sm:p-8">
              <dl>
                <CredentialRow label="Mark" value={`${company.trademark.mark}${company.trademark.symbol}`} />
                <CredentialRow label="Status" value={company.trademark.statusHuman} />
              </dl>
              <p className="mt-4 text-sm text-white/60">
                The Margadeshaka{company.trademark.symbol} word mark and associated logos are
                proprietary to {company.legalNameTitleCase}. Trademark application is on file
                with the Office of the Controller General of Patents, Designs and Trade Marks, Government of India.
              </p>
            </div>
          </section>

          {/* Registered Office */}
          <section aria-labelledby="address-heading" className="mb-12">
            <h2 id="address-heading" className="font-display text-2xl font-semibold text-white mb-6">
              Registered office
            </h2>
            <div className="glass-card p-6 sm:p-8">
              <address className="not-italic text-white/85 leading-relaxed">
                <strong className="text-white">{company.legalNameTitleCase}</strong>
                <br />
                {company.registeredOffice.line1}
                <br />
                {company.registeredOffice.line2}
                <br />
                {company.registeredOffice.city} — {company.registeredOffice.postalCode}
                <br />
                {company.registeredOffice.state}, {company.registeredOffice.country}
              </address>
              <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50 mb-1">General enquiries</p>
                  <a href={`mailto:${company.contact.email}`} className="text-brand-gold hover:text-brand-gold-light">
                    {company.contact.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Security disclosure</p>
                  <a href={`mailto:${company.contact.securityEmail}`} className="text-brand-gold hover:text-brand-gold-light">
                    {company.contact.securityEmail}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <p className="text-xs text-white/40 leading-relaxed">
            Information on this page is published verbatim from official Government of India records and
            certificates issued by the Ministry of Corporate Affairs (MCA) and the Department for Promotion
            of Industry and Internal Trade (DPIIT). Last verified: {company.dpiit.issuedDateHuman}.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
