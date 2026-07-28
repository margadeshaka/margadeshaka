'use client';

import { usePathname } from 'next/navigation';
import { goToSection } from '../lib/scroll';

/**
 * Link to a home-page section. Ported from the handoff (shared.jsx:
 * SectionLink). Renders a real `/#id` href so it works without JS and is
 * crawlable; the handler upgrades it to a smooth scroll when already home.
 */
export default function SectionLink({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const onHome = ((pathname || '/').replace(/\/+$/, '') || '/') === '/';
  return (
    <a
      href={`/#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        goToSection(id, onHome);
      }}
    >
      {children}
    </a>
  );
}
