import { company } from '../lib/company';
import SectionHeading from './SectionHeading';

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 18v-7.5h-2V18h2zM7.5 9.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zM18 18v-4.3c0-2-1.1-3-2.6-3-1.2 0-1.7.7-2 1.2v-1H11v7.1h2v-3.7c0-1 .2-1.9 1.4-1.9s1.2 1.1 1.2 2V18h2.4z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.4.7-4.1-1.6-4.1-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export default function FounderSection() {
  return (
    <section id="founder" className="section">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Founder"
          title={
            <>
              Built by a small, <span className="gold-text">opinionated team</span>
            </>
          }
        />

        <div
          className="glass-elevated mt-12"
          style={{ padding: '40px clamp(24px, 4vw, 48px)' }}
        >
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(24px, 4vw, 48px)',
            }}
          >
            {/* Avatar with halo */}
            <div className="relative w-[140px] h-[140px] flex-none">
              <div
                className="pulse-slow absolute -inset-2.5 rounded-full"
                style={{ background: 'rgba(255, 200, 100, 0.30)', filter: 'blur(20px)' }}
                aria-hidden="true"
              />
              <div
                className="relative w-full h-full rounded-full grid place-items-center"
                style={{
                  background: 'linear-gradient(135deg, #FFB830, #FFC864 40%, #FFE4B5)',
                  boxShadow: '0 0 60px rgba(255,200,100,0.4)',
                }}
              >
                <span className="font-display font-bold" style={{ fontSize: 48, color: '#1A1224' }}>
                  HG
                </span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-display text-[28px] text-white font-bold mb-1">{company.founder.name}</h3>
              <p className="text-brand-gold text-[14px] font-medium mb-[18px]">{company.founder.role}</p>

              <p className="text-white/[0.75] mb-3.5" style={{ lineHeight: 1.7 }}>
                Founder of Margadeshaka, building AI products at the intersection of Indian wisdom
                traditions and modern multi-agent systems. Currently shipping{' '}
                <strong className="text-white">Sakha</strong> on iOS, Android, and Web, with{' '}
                <strong className="text-white">Dronacharya</strong> in development.
              </p>
              <p className="text-white/[0.65] text-[15px] mb-6" style={{ lineHeight: 1.7 }}>
                Believes AI should help people think more clearly — not less. Mohali, India.
              </p>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={company.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  aria-label="Founder on LinkedIn"
                >
                  <LinkedInIcon /> LinkedIn
                </a>
                <a
                  href={company.founder.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  aria-label="Founder on GitHub"
                >
                  <GitHubIcon /> GitHub
                </a>
                <a href={`mailto:${company.contact.email}`} className="btn btn-secondary btn-sm">
                  <MailIcon /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
