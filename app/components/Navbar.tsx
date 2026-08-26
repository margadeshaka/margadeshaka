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
  /**
   * Mobile menu. `.navbar-links` is display:none below 880px and the handoff
   * shipped no replacement, so on a phone every nav destination — Home,
   * Products, Blog, Compliance, Team, Contact — was unreachable; only the logo
   * and the Try Sakha button rendered. This panel is that missing menu.
   */
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close the menu on Escape, and whenever the route changes — without this a
  // tap on Blog would navigate with the panel still covering the new page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const secActive = (id: string) => onHome && activeSection === id;

  const section = (id: string, label: string) => (
    <li key={id}>
      <a
        href={`/#${id}`}
        className={secActive(id) ? 'active' : ''}
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(false);
          goToSection(id, onHome);
        }}
      >
        {label}
      </a>
    </li>
  );

  // One definition, rendered twice — the desktop bar and the mobile panel stay
  // in step instead of drifting as items are added.
  const navItems = (
    <>
      {section('hero', 'Home')}
      {section('products', 'Products')}
      <li>
        <Link
          href="/blog/"
          className={blogActive ? 'active' : ''}
          aria-current={blogActive ? 'page' : undefined}
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          href="/compliance/"
          className={path === '/compliance' ? 'active' : ''}
          aria-current={path === '/compliance' ? 'page' : undefined}
        >
          Compliance
        </Link>
      </li>
      {section('team', 'Team')}
      {section('contact', 'Contact')}
    </>
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

        <ul className="navbar-links">{navItems}</ul>

        <div className="navbar-actions">
          <SakhaCta className="btn btn-ghost btn-sm" style={{ display: 'inline-flex' }}>
            Try Sakha <ArrowRight />
          </SakhaCta>

          <button
            type="button"
            className="navbar-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {/* Two bars that cross into an X — cheaper than swapping icons and
                it animates the state change for free. */}
            <span className={'navbar-toggle-bar' + (menuOpen ? ' is-open' : '')} />
            <span className={'navbar-toggle-bar' + (menuOpen ? ' is-open' : '')} />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={'navbar-mobile' + (menuOpen ? ' is-open' : '')}>
        <ul className="navbar-mobile-links">{navItems}</ul>
      </div>
    </header>
  );
}
