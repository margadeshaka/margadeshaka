import type { Metadata } from 'next';
import Link from 'next/link';
import CredentialRow from '../components/CredentialRow';
import SEOStructuredData from '../components/SEOStructuredData';
import { company } from '../lib/company';

export const metadata: Metadata = {
  title: 'Compliance & Legal',
  description:
    'Margadeshaka AI Private Limited — corporate identity, DPIIT Startup India recognition, trademark, and registered office. CIN U85499PB2025PTC063772.',
  alternates: { canonical: '/compliance' },
};

const ShieldIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const DocIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

function Section({
  heading,
  id,
  children,
}: {
  heading: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-h`} className="mb-14">
      <h2
        id={`${id}-h`}
        className="font-display text-white font-semibold mb-5"
        style={{ fontSize: 22, letterSpacing: '-0.01em' }}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}

export default function CompliancePage() {
  const c = company;

  return (
    <>

      <div className="relative pt-32 pb-20 cosmic-bg min-h-screen">
        <div className="container-narrow">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-gold text-sm mb-8 hover:text-brand-gold-light transition-colors"
          >
            <ArrowLeft /> Back to home
          </Link>

          {/* Page hero */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="badge">
                <span className="gold-dot" style={{ background: '#4FE9C0' }} aria-hidden="true" />
                Verified by Government of India
              </span>
              <span className="badge badge-ghost">
                <ShieldIcon size={13} /> Public record
              </span>
            </div>

            <span className="eyebrow">Compliance &amp; Legal</span>
            <h1
              className="font-display text-white mt-3"
              style={{
                fontSize: 'clamp(36px, 5.5vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              Corporate identity <span className="gold-text">&amp; recognition</span>
            </h1>

            <p
              className="mt-5 text-white/[0.72] max-w-[720px]"
              style={{ fontSize: 18, lineHeight: 1.6 }}
            >
              {c.legalNameTitleCase} is a Private Limited Company incorporated under the Companies
              Act, 2013, and a DPIIT-recognised startup under the Government of India&apos;s Startup
              India initiative.
            </p>
          </header>

          {/* DPIIT hero card */}
          <div
            className="glass glass-accent relative overflow-hidden mb-14"
            style={{ padding: 'clamp(28px, 4vw, 48px)' }}
          >
            <div
              className="absolute -top-[100px] -right-[80px] w-[380px] h-[380px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,200,100,0.20) 0%, transparent 65%)',
                filter: 'blur(50px)',
              }}
              aria-hidden="true"
            />
            <div
              className="relative grid items-center"
              style={{
                gridTemplateColumns: 'auto 1fr',
                gap: 'clamp(20px, 3vw, 36px)',
              }}
            >
              <div
                className="w-24 h-24 rounded-full grid place-items-center flex-none"
                style={{
                  background: 'linear-gradient(135deg, #FFB830, #FFC864 50%, #FFE4B5)',
                  boxShadow: '0 0 60px rgba(255,200,100,0.45)',
                  color: '#1A1224',
                }}
              >
                <ShieldIcon size={44} />
              </div>
              <div>
                <div
                  className="text-[11px] uppercase text-brand-gold font-semibold mb-2"
                  style={{ letterSpacing: '0.18em' }}
                >
                  Government of India · DPIIT · Startup India
                </div>
                <h2
                  className="font-display text-white font-bold mb-2"
                  style={{
                    fontSize: 'clamp(22px, 3vw, 30px)',
                    lineHeight: 1.2,
                  }}
                >
                  Recognised Startup
                </h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-white/70">
                  <span>
                    Cert <span className="font-mono text-brand-gold">{c.dpiit.number}</span>
                  </span>
                  <span>
                    Issued <span className="text-white">{c.dpiit.issuedDateHuman}</span>
                  </span>
                  <span>
                    Valid until <span className="text-white">{c.dpiit.validUntilHuman}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-7 pt-6 border-t border-white/[0.06] flex flex-wrap gap-2.5">
              <a
                href={c.dpiit.certUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <DownloadIcon /> View DPIIT Certificate
              </a>
              <a
                href={c.dpiit.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                Verify on {c.dpiit.verifyLabel} <ExternalIcon />
              </a>
            </div>
          </div>

          {/* Company identity */}
          <Section heading="Company identity" id="company">
            <div className="glass-elevated" style={{ padding: '8px 28px' }}>
              <CredentialRow label="Legal name" value={c.legalNameTitleCase} />
              <CredentialRow label="Entity type" value={c.entityType} />
              <CredentialRow label="Jurisdiction" value={c.jurisdiction} />
              <CredentialRow label="Date of incorporation" value={c.incorporationDateHuman} />
              <CredentialRow label="CIN" value={c.cin} mono note="Public record" />
              <CredentialRow label="PAN" value={c.pan} mono note="Public record" />
              <CredentialRow label="TAN" value={c.tan} mono note="Public record" />
            </div>
            <div className="flex flex-wrap gap-2.5 mt-5">
              <a
                href={c.incorporationCertUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <DocIcon /> Certificate of Incorporation (PDF)
              </a>
              <a
                href={c.mcaVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                Verify on MCA portal <ExternalIcon />
              </a>
            </div>
          </Section>

          {/* Trademark */}
          <Section heading="Trademark" id="trademark">
            <div className="glass" style={{ padding: '8px 28px' }}>
              <CredentialRow label="Mark" value={`${c.trademark.mark}${c.trademark.symbol}`} />
              <CredentialRow label="Status" value={c.trademark.statusHuman} />
            </div>
            <p
              className="mt-4 text-[14px] text-white/60"
              style={{ lineHeight: 1.65 }}
            >
              The Margadeshaka{c.trademark.symbol} word mark and associated logos are proprietary to{' '}
              {c.legalNameTitleCase}. Trademark application is on file with the Office of the
              Controller General of Patents, Designs and Trade Marks, Government of India.
            </p>
          </Section>

          {/* Registered office */}
          <Section heading="Registered office" id="address">
            <div className="glass" style={{ padding: 32 }}>
              <address
                className="not-italic text-white/85"
                style={{ lineHeight: 1.8, fontSize: 16 }}
              >
                <strong className="text-white block mb-1">{c.legalNameTitleCase}</strong>
                {c.registeredOffice.line1}
                <br />
                {c.registeredOffice.line2}
                <br />
                {c.registeredOffice.city} — {c.registeredOffice.postalCode}
                <br />
                {c.registeredOffice.state}, {c.registeredOffice.country}
              </address>
              <div
                className="mt-6 pt-6 border-t border-white/[0.06] grid gap-5"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
              >
                <div>
                  <div
                    className="text-[11px] uppercase text-white/50 mb-1.5"
                    style={{ letterSpacing: '0.16em' }}
                  >
                    General enquiries
                  </div>
                  <a href={`mailto:${c.contact.email}`} className="text-brand-gold hover:text-brand-gold-light">
                    {c.contact.email}
                  </a>
                </div>
                <div>
                  <div
                    className="text-[11px] uppercase text-white/50 mb-1.5"
                    style={{ letterSpacing: '0.16em' }}
                  >
                    Security disclosure
                  </div>
                  <a href={`mailto:${c.contact.securityEmail}`} className="text-brand-gold hover:text-brand-gold-light">
                    {c.contact.securityEmail}
                  </a>
                </div>
              </div>
            </div>
          </Section>

          <p
            className="text-xs text-white/40 mt-14"
            style={{ lineHeight: 1.65 }}
          >
            Information on this page is published verbatim from official Government of India records
            and certificates issued by the Ministry of Corporate Affairs (MCA) and the Department for
            Promotion of Industry and Internal Trade (DPIIT). Last verified:{' '}
            {c.dpiit.issuedDateHuman}.
          </p>
        </div>
      </div>

      <SEOStructuredData
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Compliance', href: '/compliance' },
        ]}
      />
    </>
  );
}
