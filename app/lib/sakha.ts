/**
 * Sakha "try / download" routing, ported from the claude.ai/design handoff
 * (shared.jsx: detectPlatform / openSakha).
 *
 * On a phone whose store listing is live we deep link straight to it.
 * Everything else — desktop, or a store that hasn't shipped yet — opens the
 * download modal, which shows "Coming soon" per store.
 */
import { sakhaStore } from './company';

export const SAKHA_OPEN_EVENT = 'sakha:open';

export type Platform = 'ios' | 'android' | 'desktop';

export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  // iPadOS reports itself as MacIntel, so touch points disambiguate it.
  const iOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (iOS) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

/**
 * href for a Sakha CTA. Prefers a live store URL so the link is still
 * meaningful without JS; the click handler refines it per platform.
 */
export const sakhaHref = sakhaStore.appStore || sakhaStore.playStore || '#';

export function openSakha(e?: { preventDefault?: () => void }) {
  e?.preventDefault?.();
  const platform = detectPlatform();
  if (platform === 'ios' && sakhaStore.appStore) {
    window.open(sakhaStore.appStore, '_blank', 'noopener');
    return;
  }
  if (platform === 'android' && sakhaStore.playStore) {
    window.open(sakhaStore.playStore, '_blank', 'noopener');
    return;
  }
  window.dispatchEvent(new CustomEvent(SAKHA_OPEN_EVENT));
}
