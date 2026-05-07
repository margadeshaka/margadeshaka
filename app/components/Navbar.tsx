'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', anchor: false },
  { href: '/compliance', label: 'Compliance', anchor: false },
  { href: '/#products', label: 'Products', anchor: true },
  { href: '/#founder', label: 'Founder', anchor: true },
  { href: '/#contact', label: 'Contact', anchor: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-glass border-b transition-colors ${
        scrolled
          ? 'bg-navy-950/85 border-white/[0.08]'
          : 'bg-navy-950/55 border-white/[0.05]'
      }`}
    >
      <nav
        className="max-w-[1280px] mx-auto h-16 px-6 flex items-center justify-between gap-6"
        aria-label="Primary"
      >
        <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Margadeshaka home">
          <span
            className="w-8 h-8 rounded-full flex-none"
            style={{
              background: 'linear-gradient(135deg, #FFB830 0%, #FFC864 50%, #FFD280 100%)',
              boxShadow: '0 0 20px rgba(255, 200, 100, 0.45)',
            }}
            aria-hidden="true"
          />
          <span
            className="font-display text-white"
            style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}
          >
            Margadeshaka
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm m-0 p-0 list-none">
          {navItems.map((item) => (
            <li key={item.href}>
              {item.anchor ? (
                <a href={item.href} className="text-white/70 hover:text-brand-gold transition-colors">
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className="text-white/70 hover:text-brand-gold transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <a
          href="https://sakha.live"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex btn btn-ghost btn-sm"
        >
          Try Sakha
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
