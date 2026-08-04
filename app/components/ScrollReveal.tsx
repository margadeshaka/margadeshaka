'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

/**
 * Reveal-on-scroll for the whole site (MAR-543).
 *
 * The page already had entrance animations (`.fade-up` + `delay-*`), but they
 * fire on mount — everything below the fold finished animating before the
 * reader ever scrolled to it, which is why the site read as static. This
 * watches `[data-reveal]` elements instead and toggles `.is-visible` as they
 * pass through the viewport.
 *
 * Entrances REPLAY: the class is removed once an element has fully left the
 * viewport, so scrolling back up plays the entrance again rather than showing
 * an already-finished state.
 *
 * All the animation lives in globals.css under "SCROLL REVEAL". Every hiding
 * rule there is gated on `html.reveal-ready`, which is added HERE and only
 * here, so the failure modes are all safe:
 *
 *   - No JS (crawlers, failed hydration): the class never appears, nothing is
 *     ever hidden, and the page renders exactly as it did before this existed.
 *   - prefers-reduced-motion: we return before arming, same result.
 *   - Elements already on screen are marked visible synchronously BEFORE the
 *     gate class is added, so the first paint never flashes content out.
 *
 * Keyed on pathname so a client-side navigation rescans the new page's DOM.
 */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** An element counts as arrived once it is this far up into the viewport. */
const ENTER_MARGIN = '0px 0px -22% 0px';
/** ...and only counts as gone once it is this far beyond either edge. */
const EXIT_MARGIN = '14% 0px 14% 0px';

/** Minimum wait before a hash scroll may be considered settled (ms). */
const GRACE = 400;
/** Give up waiting for it to settle after this (ms). */
const SETTLE_LIMIT = 2000;

export default function ScrollReveal() {
  const pathname = usePathname();

  useIsoLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /*
     * Two observers with deliberately different boundaries. A single observer
     * would add and remove at the same line, so an element parked exactly on
     * it flickers on every small scroll. Entry fires well inside the viewport;
     * removal only once the element is comfortably outside it — which also
     * means the reset is never visible, only the entrance is.
     */
    const enter = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
      },
      { rootMargin: ENTER_MARGIN, threshold: 0.12 },
    );
    const exit = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) continue;
          /*
           * Re-check the live box instead of trusting the entry. Observer
           * callbacks are delivered asynchronously, so a jump (hash link) can
           * queue a "left the viewport" record and then land somewhere that
           * element is on screen — the stale record would arrive afterwards
           * and blank a section the reader is looking at.
           */
          const r = e.target.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) e.target.classList.remove('is-visible');
        }
      },
      { rootMargin: EXIT_MARGIN, threshold: 0 },
    );

    const observe = (el: Element) => {
      enter.observe(el);
      exit.observe(el);
    };

    /** Reveal everything currently on screen, however little of it shows. */
    const revealOnScreen = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
      });
    };

    /*
     * A hash link jumps past the reveal line instead of crossing it, so the
     * section it lands on can arrive still in its pre-reveal state — landing on
     * #contact left the team stage sitting half on screen and blank. The scroll
     * is animated (lib/scroll.ts, ~720ms), so wait for it to settle rather than
     * guessing a delay, then reveal whatever is on screen.
     */
    let settleFrame = 0;
    const revealAfterJump = () => {
      cancelAnimationFrame(settleFrame);
      const started = performance.now();
      let last = -1;
      let still = 0;
      const tick = () => {
        const y = window.scrollY;
        still = y === last ? still + 1 : 0;
        last = y;
        const elapsed = performance.now() - started;
        /*
         * The GRACE floor matters: on a fresh load the hash scroll is kicked
         * off a frame or two after this runs, so without it the position looks
         * "settled" at 0 and we would reveal the top of the page instead of
         * wherever the link actually lands. The ceiling is a safety net for a
         * scroll that never starts at all.
         */
        if ((still >= 3 && elapsed > GRACE) || elapsed > SETTLE_LIMIT) return revealOnScreen();
        settleFrame = requestAnimationFrame(tick);
      };
      settleFrame = requestAnimationFrame(tick);
    };

    // First pass: anything already on screen is shown outright, with no
    // transition to play, so hydration cannot blink it away and back.
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.78 && r.bottom > 0) el.classList.add('is-visible');
      observe(el);
    });

    document.documentElement.classList.add('reveal-ready');

    /*
     * The blog listing filters its rows as you type, so rows can be mounted
     * after this ran. Without this they would never be observed — and since
     * the pre-state hides them, they would come back permanently invisible.
     */
    const added = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('[data-reveal]')) observe(node);
          node.querySelectorAll('[data-reveal]').forEach(observe);
        });
      }
    });
    added.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('hashchange', revealAfterJump);
    if (window.location.hash) revealAfterJump();

    return () => {
      enter.disconnect();
      exit.disconnect();
      added.disconnect();
      window.removeEventListener('hashchange', revealAfterJump);
      cancelAnimationFrame(settleFrame);
      document.documentElement.classList.remove('reveal-ready');
    };
  }, [pathname]);

  return null;
}
