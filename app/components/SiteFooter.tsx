import Link from 'next/link';
import { company } from '../lib/company';
import { ROUTES } from '../lib/routes';
import LogoMark from './LogoMark';
import SakhaCta from './SakhaCta';
import SectionLink from './SectionLink';

/**
 * Site footer, ported from the handoff (shared.jsx: Footer) onto the design's
 * own `.footer` / `.footer-grid` / `.footer-col` classes.
 *
 * Three deliberate deviations from the prototype, all noted in the PR:
 *  - No "About" link. The handoff's footer links to #about, but its HomePage
 *    no longer renders AboutSection, so the anchor would go nowhere.
 *  - No "Refunds" / "Disclaimer" links. The handoff lists both (as did the
 *    previous footer), but /refund and /disclaimer have never existed — they
 *    404. Restore them here once those pages are written.
 *  - "Founder" became "Team", matching the new constellation section.
 */
export default function SiteFooter() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        <div>
          <Link href={ROUTES.home} className="navbar-brand" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <LogoMark size={34} />
            <span className="navbar-wordmark">{company.brand}</span>
          </Link>
          <p
            style={{
              color: 'rgb(var(--fg-rgb) / max(0.5, var(--fg-a-min)))',
              fontSize: 14,
              lineHeight: 1.6,
              marginTop: 12,
              marginBottom: 14,
            }}
          >
            AI for guidance &amp; learning. Building Sakha and Dronacharya from India.
          </p>
          <p style={{ fontSize: 12, color: 'rgb(var(--fg-rgb) / max(0.45, var(--fg-a-min)))', lineHeight: 1.6 }}>
            <strong style={{ color: 'rgb(var(--fg-rgb) / max(0.7, var(--fg-a-min)))', display: 'block', marginBottom: 4 }}>
              {company.legalNameTitleCase}
            </strong>
            CIN: <span className="font-mono">{company.cin}</span>
          </p>
        </div>

        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li>
              <SakhaCta>Sakha</SakhaCta>
            </li>
            {/* Dronacharya is deliberately not listed while it is unreleased —
                it had pointed at /blog/dronacharya-active-learning, since the
                redesigned products section is entirely Sakha and that post is
                the only page with real Dronacharya detail. Restore the link
                here once the product ships. */}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href={ROUTES.blog}>Blog</Link>
            </li>
            <li>
              <SectionLink id="team">Team</SectionLink>
            </li>
            <li>
              <SectionLink id="contact">Contact</SectionLink>
            </li>
            <li>
              <Link href={ROUTES.compliance}>Compliance</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link href={ROUTES.privacy}>Privacy</Link>
            </li>
            <li>
              <Link href={ROUTES.terms}>Terms</Link>
            </li>
            <li style={{ paddingTop: 6 }}>
              <a href={`mailto:${company.contact.email}`} style={{ wordBreak: 'break-all' }}>
                {company.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgb(var(--fg-rgb) / 0.05)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: 12,
          color: 'rgb(var(--fg-rgb) / max(0.4, var(--fg-a-min)))',
        }}
      >
        {/* Compliance bar — registered address plus government recognition IDs
            on every page. The handoff's footer drops this; it is the India
            disclosure pattern the site deliberately adopted, and DPIIT is the
            company's strongest trust marker. */}
        <p style={{ marginBottom: 6 }}>
          DPIIT Recognised Startup{' '}
          <span className="font-mono" style={{ color: 'rgb(var(--fg-rgb) / max(0.7, var(--fg-a-min)))' }}>
            {company.dpiit.number}
          </span>
          {' · '}CIN{' '}
          <span className="font-mono" style={{ color: 'rgb(var(--fg-rgb) / max(0.7, var(--fg-a-min)))' }}>
            {company.cin}
          </span>
          {' · '}
          <Link href={ROUTES.compliance} style={{ color: 'var(--brand-gold)' }}>
            View credentials →
          </Link>
        </p>
        <address style={{ fontStyle: 'normal', marginBottom: 6, color: 'rgb(var(--fg-rgb) / max(0.55, var(--fg-a-min)))' }}>
          {company.registeredOffice.city}, {company.registeredOffice.state},{' '}
          {company.registeredOffice.country}
        </address>
        <p style={{ marginBottom: 4 }}>
          &copy; {new Date().getFullYear()} {company.legalNameTitleCase}. All rights reserved.{' '}
          {company.brand}
          {company.trademark.symbol} is a trademark of {company.legalNameTitleCase}.
        </p>
      </div>
    </footer>
  );
}
