'use client';

import { useEffect } from 'react';
import { scrollToSection } from '../lib/scroll';

/**
 * Handles arriving at the home page with a section in the hash (e.g. /#team
 * from the footer on another route).
 *
 * The prototype was a single hash-routed SPA, so a section was always already
 * mounted. Here the home sections mount on navigation, and the browser's own
 * hash jump fires before the animated sections have laid out — so we re-run the
 * scroll after mount, offset for the fixed navbar.
 */
export default function HomeSectionScroll() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (!id) return;

    let frames = 0;
    const tick = () => {
      if (scrollToSection(id)) return;
      if (frames++ < 40) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return null;
}
