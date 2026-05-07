import { ReactNode } from 'react';
import { company } from '../lib/company';
import SectionHeading from './SectionHeading';

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

type Accent = 'gold' | 'purple' | 'aurora';

const accentColors: Record<Accent, { bg: string; border: string; color: string }> = {
  gold: { bg: 'rgba(255, 200, 100, 0.10)', border: 'rgba(255, 200, 100, 0.30)', color: 'var(--brand-gold)' },
  purple: { bg: 'rgba(126, 77, 212, 0.10)', border: 'rgba(126, 77, 212, 0.30)', color: '#B89EF0' },
  aurora: { bg: 'rgba(0, 230, 170, 0.10)', border: 'rgba(0, 230, 170, 0.30)', color: '#4FE9C0' },
};

interface ContactCardProps {
  icon: ReactNode;
  kicker: string;
  value: string;
  sub?: string;
  href?: string;
  external?: boolean;
  accent: Accent;
}

function ContactCard({ icon, kicker, value, sub, href, external, accent }: ContactCardProps) {
  const c = accentColors[accent];
  const baseStyles = { padding: 28, textAlign: 'center' as const };
  const inner = (
    <>
      <div
        className="w-12 h-12 rounded-full grid place-items-center mx-auto mb-4"
        style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}
      >
        {icon}
      </div>
      <div
        className="text-[11px] uppercase text-white/[0.45] mb-1.5"
        style={{ letterSpacing: '0.16em' }}
      >
        {kicker}
      </div>
      <div className="text-white font-medium" style={{ wordBreak: 'break-word' }}>
        {value}
      </div>
      {sub && <div className="text-white/50 text-[13px] mt-1">{sub}</div>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="glass glass-interactive block no-underline text-inherit"
        style={baseStyles}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className="glass" style={baseStyles}>
      {inner}
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Get in touch"
          title={
            <>
              Let&apos;s <span className="gold-text">talk</span>
            </>
          }
          subtitle="Investors, partners, press, or future hires — we read every email."
        />

        <div
          className="mt-12 grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
        >
          <ContactCard
            icon={<MailIcon />}
            kicker="Email"
            value={company.contact.email}
            href={`mailto:${company.contact.email}`}
            accent="gold"
          />
          <ContactCard
            icon={<PinIcon />}
            kicker="Based in"
            value="Mohali, Punjab"
            sub="India · Remote-first"
            accent="purple"
          />
          <ContactCard
            icon={<ArrowRight />}
            kicker="Try our product"
            value="sakha.live"
            sub="Beta on iOS · Android · Web"
            href="https://sakha.live"
            external
            accent="aurora"
          />
        </div>
      </div>
    </section>
  );
}
