'use client';

import { useEffect, useState } from 'react';

/**
 * Dark / light switch (MAR-545).
 *
 * The theme itself is applied by the inline boot script in layout.tsx, which
 * runs before first paint — a React effect cannot do that job on a static
 * export, and doing it here would show a frame of the wrong theme. This
 * component only writes the choice; the script owns reading it back.
 *
 * The contract with that script, which must stay in sync:
 *   - storage key `md-theme`, values `'light'` | `'dark'`
 *   - light sets `data-theme="light"` on <html>; dark DELETES the attribute,
 *     so dark remains the default that needs no attribute at all
 *   - the <meta name="theme-color"> content follows the theme
 *
 * Both icons are always rendered and CSS picks which is visible, rather than
 * branching on state. Choosing in JS would render the dark-mode icon on the
 * server, then correct it after hydration — a light-mode visitor would see the
 * wrong icon for a frame, which is the same flash the script exists to avoid.
 */
const STORAGE_KEY = 'md-theme';
const DARK_META = '#06050F';
const LIGHT_META = '#F4EFE7';

function apply(theme: 'light' | 'dark') {
  const root = document.documentElement;
  if (theme === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? LIGHT_META : DARK_META);
}

export default function ThemeToggle({ className }: { className?: string }) {
  // Only used for the label; the visual state comes from CSS so it is already
  // correct before this mounts.
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.dataset.theme === 'light');

    // Keep tabs in step: changing the theme in one should not leave another
    // showing the opposite.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue === 'light' ? 'light' : 'dark';
      apply(next);
      setIsLight(next === 'light');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    apply(next);
    setIsLight(next === 'light');
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Safari private mode throws on write. The theme still applies for this
      // page view; it just will not be remembered.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={'theme-toggle' + (className ? ` ${className}` : '')}
      // The icon shows the theme you would switch TO, so the label has to match
      // that, not the theme you are currently in.
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <span className="theme-toggle-icon theme-toggle-moon" aria-hidden="true">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
      <span className="theme-toggle-icon theme-toggle-sun" aria-hidden="true">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
        </svg>
      </span>
    </button>
  );
}
