'use client';

import { useEffect } from 'react';

/**
 * Site-wide cosmic ambiance from the claude.ai/design bundle
 * (shared.jsx: dynamicSky + stardust IIFEs, styles.css shooting stars/meteors).
 *
 * Renders two additive, pointer-events:none overlays (a time-of-day sky tint
 * and a few drifting shooting stars) and wires three client-only behaviors:
 *   - dynamic sky:   sets <html data-sky> by the local hour (subtle tint).
 *   - stardust:      buttons emit tiny fading sparks under the cursor.
 *   - meteor shower: appears only on a handful of special days.
 *
 * Mounted once in the root layout so every route inherits it. All markup is
 * static (no time/random at render time), so it is hydration-safe; the
 * time/random-dependent work runs in the effect only.
 */
export default function CosmicEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dynamic sky — subtle time-of-day tint.
    const h = new Date().getHours();
    const phase = h < 5 ? 'night' : h < 9 ? 'dawn' : h < 17 ? 'day' : h < 20 ? 'dusk' : 'night';
    document.documentElement.dataset.sky = phase;

    // Special days: New Year, Perseids peak (Aug 12–13), Geminids peak (Dec 13–14).
    const d = new Date();
    const md = `${d.getMonth() + 1}-${d.getDate()}`;
    const special = ['1-1', '8-12', '8-13', '12-14', '12-13'];
    let shower: HTMLDivElement | null = null;
    if (special.includes(md) && !reduce) {
      shower = document.createElement('div');
      shower.className = 'meteor-shower';
      shower.setAttribute('aria-hidden', 'true');
      shower.innerHTML = Array.from({ length: 5 }, () => '<span class="meteor"></span>').join('');
      document.body.appendChild(shower);
    }

    // Stardust — buttons emit tiny fading sparks as the cursor moves over them.
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.('.btn, .btn-primary, .btn-secondary, .btn-ghost');
      if (!btn) return;
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const spark = document.createElement('span');
      spark.className = 'stardust';
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      spark.style.setProperty('--dx', `${(Math.random() * 16 - 8).toFixed(1)}px`);
      spark.style.setProperty('--dy', `${(Math.random() * 14 + 4).toFixed(1)}px`);
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 650);
    };
    if (!reduce) document.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      shower?.remove();
      delete document.documentElement.dataset.sky;
    };
  }, []);

  return (
    <>
      <div className="sky-tint" aria-hidden="true" />
      <div className="shooting-stars shooting-stars--fixed" aria-hidden="true">
        <span className="shooting-star" />
        <span className="shooting-star" />
        <span className="shooting-star" />
        <span className="shooting-star" />
      </div>
    </>
  );
}
