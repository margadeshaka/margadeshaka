import { company } from '../lib/company';
import SakhaCta from './SakhaCta';
import { ArrowRight, GitHub, Instagram, LinkedIn, Mail } from './icons';

/**
 * Contact section, ported from the handoff (home.jsx: ContactSection).
 *
 * The focal point is a glowing orb that is itself the mailto link, with a
 * rippling halo and a greeting bubble on hover. Particles and the orb animation
 * are pure CSS, so this stays a server component.
 */
export default function ContactSection() {
  const email = company.contact.email;

  return (
    <section id="contact" className="section contact-orb-section">
      <div className="orb-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className="container-narrow contact-orb-inner">
        <span className="eyebrow">Say hello</span>
        <h2 className="contact-orb-title">
          Let&rsquo;s Start a <span className="gold-text">Conversation</span>
        </h2>
        <p className="contact-orb-sub">
          Whether you&rsquo;re an early user, partner, investor, collaborator, or simply curious
          about what we&rsquo;re building, we&rsquo;d love to connect.
        </p>

        <a className="contact-orb" href={`mailto:${email}`} aria-label="Email us">
          <span className="contact-orb-ripple" aria-hidden="true" />
          <span className="contact-orb-core" aria-hidden="true" />
          <span className="contact-orb-bubble" aria-hidden="true">
            Hi 👋 We&rsquo;d love to hear from you.
          </span>
        </a>

        <SakhaCta className="btn btn-primary contact-orb-cta">
          Start a Conversation <ArrowRight />
        </SakhaCta>

        <div className="contact-orb-links">
          <a className="orb-link" href={`mailto:${email}`}>
            <span className="orb-link-icon">
              <Mail />
            </span>
            <span className="orb-link-name">Email</span>
          </a>
          <a
            className="orb-link"
            href={company.founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="orb-link-icon">
              <LinkedIn />
            </span>
            <span className="orb-link-name">LinkedIn</span>
          </a>
          <a
            className="orb-link"
            href={company.web.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="orb-link-icon">
              <Instagram />
            </span>
            <span className="orb-link-name">Instagram</span>
          </a>
          {/* GitHub: the deleted FounderSection held the site's only clickable
              GitHub link. Without this the org appears in JSON-LD `sameAs` and
              nowhere a visitor can actually click. */}
          <a
            className="orb-link"
            href={company.web.githubOrg}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="orb-link-icon">
              <GitHub />
            </span>
            <span className="orb-link-name">GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
