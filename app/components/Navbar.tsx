'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';

const navItems = [
  { href: '/', label: 'Home', anchor: false },
  { href: '/#products', label: 'Products', anchor: true },
  { href: '/blog', label: 'Blog', anchor: false },
  { href: '/compliance', label: 'Compliance', anchor: false },
  { href: '/#founder', label: 'Founder', anchor: true },
  { href: '/#contact', label: 'Contact', anchor: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Active state for page (non-anchor) links; Blog stays active on articles too.
  // Normalize the trailing slash first — under next.config `trailingSlash: true`
  // usePathname() returns e.g. '/compliance/', so an exact compare would miss.
  const isActive = (href: string) => {
    const path = pathname.replace(/\/+$/, '') || '/';
    if (href === '/blog') return path === '/blog' || path.startsWith('/blog/');
    return path === href;
  };

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
          <LogoMark size={34} />
          <span
            className="font-display text-white"
            style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}
          >
            Margadeshaka
          </span>
        </Link>

        <ul className="hidden min-[880px]:flex items-center gap-8 text-sm m-0 p-0 list-none">
          {navItems.map((item) => {
            const active = !item.anchor && isActive(item.href);
            const cls = `relative transition-colors ${active ? 'text-brand-gold' : 'text-white/70 hover:text-brand-gold'}`;
            const dot = active ? <span className="nav-active-dot" aria-hidden="true" /> : null;
            return (
              <li key={item.href}>
                {item.anchor ? (
                  <a href={item.href} className={cls}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={cls} aria-current={active ? 'page' : undefined}>
                    {item.label}
                    {dot}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <a
          href="https://sakha.live"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex btn btn-ghost btn-sm"
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
