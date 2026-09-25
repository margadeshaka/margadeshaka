import Link from 'next/link';
import { ROUTES } from '../lib/routes';

interface SakhaLegalNavProps {
  /** The page this nav is rendered on — omitted from its own link list. */
  current: 'privacy' | 'terms' | 'delete-account';
}

const LINKS = [
  { key: 'privacy', href: ROUTES.sakhaPrivacy, label: 'Privacy Policy' },
  { key: 'terms', href: ROUTES.sakhaTerms, label: 'Terms of Service' },
  { key: 'delete-account', href: ROUTES.sakhaDeleteAccount, label: 'Delete your account' },
] as const;

/**
 * Cross-links between Sakha's three legal pages (privacy, terms, account
 * deletion), rendered at the end of each one so a reader — or a Google Play
 * reviewer — can reach the other two without going back through the app.
 */
export default function SakhaLegalNav({ current }: SakhaLegalNavProps) {
  const others = LINKS.filter((link) => link.key !== current);
  return (
    <nav aria-label="Sakha legal pages" className="mt-10 pt-7 border-t border-white/[0.08]">
      <p className="text-white/45 text-xs uppercase tracking-wide mb-3">Related Sakha pages</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {others.map((link) => (
          <li key={link.key}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
