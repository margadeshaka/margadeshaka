/**
 * Smooth section scrolling, ported from the handoff (shared.jsx:
 * smoothScrollTo / scrollToSection / goToSection).
 *
 * The prototype was a hash-routed SPA, so "go to #team" could always assume the
 * home markup was one render away. Here the home sections only exist on `/`, so
 * goToSection falls back to a real navigation with the section in the hash and
 * lets the home page scroll on mount.
 */
import { homeSection } from './routes';

const DURATION = 720;

export function smoothScrollTo(targetY: number, duration = DURATION) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY);
    return;
  }

  let startTs: number | undefined;
  const step = (ts: number) => {
    if (startTs === undefined) startTs = ts;
    const elapsed = ts - startTs;
    const t = Math.min(1, elapsed / duration);
    // easeInOutCubic
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    window.scrollTo(0, startY + diff * ease);
    if (elapsed < duration) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const nav = document.querySelector('.navbar') as HTMLElement | null;
  const offset = (nav ? nav.offsetHeight : 64) + 18;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  smoothScrollTo(Math.max(0, y));
  return true;
}

/** Scroll to a home-page section, navigating home first when we're elsewhere. */
export function goToSection(id: string, onHome: boolean) {
  if (onHome && scrollToSection(id)) return;
  // Not on the home page (or the section isn't mounted): let the browser
  // navigate, and HomeSectionScroll picks the hash up on arrival.
  window.location.href = homeSection(id);
}

/** Section ids tracked for the navbar's active state, in document order. */
export const NAV_SECTIONS = ['hero', 'products', 'team', 'contact'] as const;
