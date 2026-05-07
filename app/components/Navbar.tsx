import Link from 'next/link';

const navItems = [
  { href: '#products', label: 'Products' },
  { href: '#about', label: 'About' },
  { href: '#founder', label: 'Founder' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-glass bg-navy-950/60 border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-saffron-gradient shadow-[0_0_20px_rgba(255,200,100,0.4)]" aria-hidden="true" />
          <span className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-brand-gold transition-colors">
            Margadeshaka
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-white/70 hover:text-brand-gold transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://sakha.live"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex btn-ghost text-sm py-2 px-4"
        >
          Try Sakha
        </a>
      </nav>
    </header>
  );
}
