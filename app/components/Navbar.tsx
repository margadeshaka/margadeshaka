'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';
import SakhaCta from './SakhaCta';
import { ArrowRight } from './icons';
import { NAV_SECTIONS, goToSection } from '../lib/scroll';

/**
 * Primary navigation, ported from the handoff (shared.jsx: Navbar).
 *
 * Uses the design's own `.navbar` / `.navbar-inner` / `.navbar-links` classes
 * from globals.css rather than Tailwind utilities, so the styling stays in one
 * place with the rest of the handoff CSS.
 *
 * Section links (Home / Products / Team / Contact) point at home-page sections;
 * the handoff tracked which one is in view to highlight it, which is
 * reproduced here but only while we're actually on `/`.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pathname = usePathname();

  // trailingSlash: true means usePathname() yields '/compliance/', so strip it.
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  const onHome = path === '/';
  const blogActive = path === '/blog' || path.startsWith('/blog/');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (!onHome) return;
      const mid = window.scrollY + window.innerHeight * 0.35;
      let current: string = 'hero';
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  const secActive = (id: string) => onHome && activeSection === id;

  const section = (id: string, label: string) => (
    <li key={id}>
      <a
        href={`/#${id}`}
        className={secActive(id) ? 'active' : ''}
        onClick={(e) => {
          e.preventDefault();
          goToSection(id, onHome);
        }}
      >
        {label}
      </a>
    </li>
  );

  return (
    <header className={'navbar' + (scrolled ? ' scrolled' : '')}>
      <nav className="navbar-inner" aria-label="Primary">
        <a
          href="/"
          className="navbar-brand"
          aria-label="Margadeshaka home"
          onClick={(e) => {
            if (!onHome) return; // let it navigate home normally
            e.preventDefault();
            goToSection('hero', true);
          }}
        >
          <LogoMark size={26} />
          <span className="navbar-wordmark">Margadeshaka</span>
        </a>

        <ul className="navbar-links">
          {section('hero', 'Home')}
          {section('products', 'Products')}
          <li>
            <Link href="/blog" className={blogActive ? 'active' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/compliance"
              className={path === '/compliance' ? 'active' : ''}
              aria-current={path === '/compliance' ? 'page' : undefined}
            >
              Compliance
            </Link>
          </li>
          {section('team', 'Team')}
          {section('contact', 'Contact')}
        </ul>

        <SakhaCta className="btn btn-ghost btn-sm" style={{ display: 'inline-flex' }}>
          Try Sakha <ArrowRight />
        </SakhaCta>
      </nav>
    </header>
  );
}
