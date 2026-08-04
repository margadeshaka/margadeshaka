import { company } from '../lib/company';
import SakhaCta from './SakhaCta';
import { ArrowRight, Instagram, LinkedIn, Mail } from './icons';

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
        <span className="eyebrow" data-reveal="up">Say hello</span>
        <h2 className="contact-orb-title" data-reveal="up" style={{ '--rd': 1 } as React.CSSProperties}>
          Let&rsquo;s Start a <span className="gold-text">Conversation</span>
        </h2>
        <p className="contact-orb-sub" data-reveal="up" style={{ '--rd': 2 } as React.CSSProperties}>
          Whether you&rsquo;re an early user, partner, investor, collaborator, or simply curious
          about what we&rsquo;re building, we&rsquo;d love to connect.
        </p>

        <a
          className="contact-orb"
          href={`mailto:${email}`}
          aria-label="Email us"
          data-reveal="scale"
          style={{ '--rd': 3 } as React.CSSProperties}
        >
          <span className="contact-orb-ripple" aria-hidden="true" />
          <span className="contact-orb-core" aria-hidden="true" />
          <span className="contact-orb-bubble" aria-hidden="true">
            Hi 👋 We&rsquo;d love to hear from you.
          </span>
        </a>

        {/* Wrapped rather than tagged directly: .btn owns a transition
            shorthand that the reveal's umbrella rule would replace. */}
        <div data-reveal="up" style={{ '--rd': 4 } as React.CSSProperties}>
          <SakhaCta className="btn btn-primary contact-orb-cta">
            Start a Conversation <ArrowRight />
          </SakhaCta>
        </div>

        <div className="contact-orb-links" data-reveal="up" style={{ '--rd': 5 } as React.CSSProperties}>
          <a className="orb-link" href={`mailto:${email}`}>
            <span className="orb-link-icon">
              <Mail />
            </span>
            <span className="orb-link-name">Email</span>
          </a>
          <a
            className="orb-link"
            href={company.web.linkedin}
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
        </div>
      </div>
    </section>
  );
}
