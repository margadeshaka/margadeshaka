'use client';

import { openSakha, sakhaHref } from '../lib/sakha';

/**
 * Any "Try Sakha" / "Talk to Sakha" action. Renders a real anchor so it still
 * works without JS once a store listing is live; the handler deep links per
 * platform or opens the download modal.
 */
export default function SakhaCta({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <a href={sakhaHref} onClick={openSakha} className={className} style={style}>
      {children}
    </a>
  );
}
