import Link from 'next/link';
import { company } from '../lib/company';
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
          <Link href="/" className="navbar-brand" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <LogoMark size={34} />
            <span className="navbar-wordmark">{company.brand}</span>
          </Link>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 14,
              lineHeight: 1.6,
              marginTop: 12,
              marginBottom: 14,
            }}
          >
            AI for guidance &amp; learning. Building Sakha and Dronacharya from India.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
            <strong style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 4 }}>
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
            {/* Points at the article, not #products: the redesigned products
                section is entirely Sakha, so the old anchor promised
                Dronacharya content that isn't there. This post is the only
                page on the site with real Dronacharya detail. */}
            <li>
              <Link href="/blog/dronacharya-active-learning">Dronacharya</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <SectionLink id="team">Team</SectionLink>
            </li>
            <li>
              <SectionLink id="contact">Contact</SectionLink>
            </li>
            <li>
              <Link href="/compliance">Compliance</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
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
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        {/* Compliance bar — registered address plus government recognition IDs
            on every page. The handoff's footer drops this; it is the India
            disclosure pattern the site deliberately adopted, and DPIIT is the
            company's strongest trust marker. */}
        <p style={{ marginBottom: 6 }}>
          DPIIT Recognised Startup{' '}
          <span className="font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {company.dpiit.number}
          </span>
          {' · '}CIN{' '}
          <span className="font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {company.cin}
          </span>
          {' · '}
          <Link href="/compliance" style={{ color: 'var(--brand-gold)' }}>
            View credentials →
          </Link>
        </p>
        <address style={{ fontStyle: 'normal', marginBottom: 6, color: 'rgba(255,255,255,0.55)' }}>
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
