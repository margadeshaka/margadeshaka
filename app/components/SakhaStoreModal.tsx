'use client';

import { useEffect, useState } from 'react';
import { sakhaStore } from '../lib/company';
import { SAKHA_OPEN_EVENT } from '../lib/sakha';
import { Apple, GooglePlay } from './icons';

/**
 * Sakha download modal, ported from the handoff (shared.jsx: SakhaStoreModal).
 * Opens on the `sakha:open` event that openSakha() dispatches when there is no
 * live store listing for the visitor's platform.
 */
function StoreBadge({
  href,
  icon,
  kicker,
  name,
}: {
  href: string;
  icon: React.ReactNode;
  kicker: string;
  name: string;
}) {
  const live = !!href;
  const inner = (
    <>
      <span className="store-badge-icon">{icon}</span>
      <span className="store-badge-text">
        <span className="store-badge-kicker">{live ? kicker : 'Coming soon to'}</span>
        <span className="store-badge-name">{name}</span>
      </span>
    </>
  );
  if (!live) {
    return (
      <span className="store-badge is-soon" aria-disabled="true">
        {inner}
      </span>
    );
  }
  return (
    <a className="store-badge" href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}

export default function SakhaStoreModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(SAKHA_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(SAKHA_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    // Keep the page behind the overlay from scrolling.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div
      className="sakha-modal-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Download Sakha"
    >
      <div className="sakha-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="sakha-modal-x" aria-label="Close" onClick={close}>
          ✕
        </button>
        <span className="sakha-modal-mark" aria-hidden="true">
          <span className="sakha-modal-orb-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/sakha-orb.png"
            alt=""
            width="64"
            height="64"
            style={{ display: 'block', position: 'relative' }}
          />
        </span>
        <h3 className="sakha-modal-title">Get Sakha on your phone</h3>
        <p className="sakha-modal-sub">
          Sakha is your thoughtful companion, always in your pocket. Choose your store to download.
        </p>
        <div className="sakha-modal-badges">
          <StoreBadge
            href={sakhaStore.appStore}
            icon={<Apple />}
            kicker="Download on the"
            name="App Store"
          />
          <StoreBadge
            href={sakhaStore.playStore}
            icon={<GooglePlay />}
            kicker="Get it on"
            name="Google Play"
          />
        </div>
      </div>
    </div>
  );
}
