'use client';

import { useEffect, useState } from 'react';

/**
 * Floating scroll-to-top control (bottom-right, site-wide).
 *
 * A saffron progress dial: the gold ring fills as you scroll the page, an
 * up-arrow sits at its centre. Reveals once you've scrolled past a threshold,
 * scrolls smoothly back to the top on click, and respects reduced-motion.
 */
const RADIUS = 24;
const CIRC = 2 * Math.PI * RADIUS;

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
      setVisible(el.scrollTop > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Scroll to top"
      className={`scroll-top${visible ? ' is-visible' : ''}`}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
    >
      <svg className="scroll-top-ring" width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
        <circle className="scroll-top-track" cx="26" cy="26" r={RADIUS} />
        <circle
          className="scroll-top-progress"
          cx="26"
          cy="26"
          r={RADIUS}
          style={{ strokeDasharray: CIRC, strokeDashoffset: CIRC * (1 - progress) }}
        />
      </svg>
      <svg
        className="scroll-top-arrow"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
