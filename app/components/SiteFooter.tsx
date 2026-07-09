import Link from 'next/link';
import { company } from '../lib/company';

const productLinks = [
  { href: 'https://sakha.live', label: 'Sakha', external: true },
  { href: '/#products', label: 'Dronacharya', external: false },
];

const companyLinks = [
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/#founder', label: 'Founder' },
  { href: '/#contact', label: 'Contact' },
  { href: '/compliance', label: 'Compliance' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/refund', label: 'Refunds' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-navy-950/80 backdrop-blur-glass mt-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <img src="/images/margadeshaka-logo.svg" alt="" width={32} height={32} className="w-8 h-8 flex-none" style={{ filter: 'drop-shadow(0 0 6px rgba(255,200,100,0.9)) drop-shadow(0 0 14px rgba(255,200,100,0.55))' }} aria-hidden="true" />
            <span className="font-display text-lg font-semibold text-white">{company.brand}</span>
          </Link>
          <p className="text-white/50 leading-relaxed mb-4">
            AI for guidance &amp; learning. Building Sakha and Dronacharya from India.
          </p>
          <p className="text-xs text-white/55 leading-relaxed">
            <strong className="text-white/60 font-medium block mb-1">{company.legalNameTitleCase}</strong>
            CIN: <span className="font-mono">{company.cin}</span>
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Products</h3>
          <ul className="space-y-2">
            {productLinks.map((link) =>
              link.external ? (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Company</h3>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Legal</h3>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={`mailto:${company.contact.email}`} className="text-white/60 hover:text-brand-gold transition-colors break-all">
                {company.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance bar — visible across the whole site */}
      <div className="border-t border-white/5 px-6 py-6 bg-navy-950/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-500" aria-hidden="true" />
              <span>DPIIT Recognized Startup</span>
              <span className="font-mono text-white/70">{company.dpiit.number}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span>CIN</span>
              <span className="font-mono text-white/70">{company.cin}</span>
            </span>
            <Link href="/compliance" className="text-brand-gold hover:text-brand-gold-light underline-offset-2 hover:underline">
              View credentials →
            </Link>
          </div>
          <address className="not-italic text-white/55">
            {company.registeredOffice.city}, {company.registeredOffice.state}, {company.registeredOffice.country}
          </address>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-6 text-center text-xs text-white/55">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} {company.legalNameTitleCase}. All rights reserved.
          {company.brand}{company.trademark.symbol} is a trademark of {company.legalNameTitleCase}.
        </p>
        <p className="italic">&quot;Navigate life decisions. Master new skills.&quot; · Built in India</p>
      </div>
    </footer>
  );
}
