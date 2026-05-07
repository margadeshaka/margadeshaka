import { ReactNode } from 'react';
import SectionHeading from './SectionHeading';

type Product = {
  name: string;
  sanskrit: string;
  meaning: string;
  tagline: string;
  description: string;
  status: 'Live' | 'In Beta' | 'Coming Soon';
  statusVariant: 'gold' | 'aurora' | 'ghost';
  platforms: string[];
  href: string | null;
  accent: string;
  features: string[];
  icon: ReactNode;
};

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3z" />
    <path d="M19 14l-.7 2.1L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.9L19 14z" />
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const products: Product[] = [
  {
    name: 'Sakha',
    sanskrit: 'सखा',
    meaning: 'friend',
    tagline: 'AI Vedic astrology companion',
    description:
      'Birth chart analysis, Vimshottari Dasha predictions, relationship compatibility, and emotionally aware coaching — built on Swiss Ephemeris and Azure OpenAI.',
    status: 'In Beta',
    statusVariant: 'gold',
    platforms: ['iOS', 'Android', 'Web'],
    href: 'https://sakha.live',
    accent: 'rgba(255, 200, 100, 0.25)',
    icon: <SparklesIcon />,
    features: ['120-year Dasha timeline', 'Relationship synastry', 'Crisis-aware support'],
  },
  {
    name: 'Dronacharya',
    sanskrit: 'द्रोणाचार्य',
    meaning: 'the legendary teacher',
    tagline: 'AI tutor that teaches by thinking',
    description:
      'Multi-agent AI tutoring with adaptive difficulty and project-based Bronze, Silver, and Gold certifications. Active learning, not passive video.',
    status: 'Coming Soon',
    statusVariant: 'ghost',
    platforms: ['Web'],
    href: null,
    accent: 'rgba(126, 77, 212, 0.30)',
    icon: <BookIcon />,
    features: ['Project-based mastery', 'Bronze · Silver · Gold tiers', 'Adaptive multi-agent tutoring'],
  },
];

const statusStyles: Record<Product['statusVariant'], string> = {
  gold: 'bg-brand-gold/[0.12] border-brand-gold/30 text-brand-gold',
  aurora: 'bg-aurora-500/10 border-aurora-500/30 text-aurora-400',
  ghost: 'bg-white/[0.04] border-white/10 text-white/55',
};

function StatusBadge({ status, variant }: { status: string; variant: Product['statusVariant'] }) {
  return (
    <span
      className={`px-3 py-[5px] rounded-full text-[11px] font-medium uppercase tracking-[0.04em] whitespace-nowrap border ${statusStyles[variant]}`}
    >
      {status}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const inner = (
    <>
      <div
        className="absolute -top-[100px] -right-[80px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${product.accent} 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl grid place-items-center text-brand-gold"
              style={{ background: 'rgba(255, 200, 100, 0.10)', border: '1px solid rgba(255, 200, 100, 0.25)' }}
            >
              {product.icon}
            </div>
            <div>
              <h3 className="font-display text-[28px] font-bold text-white leading-none m-0" style={{ letterSpacing: '-0.02em' }}>
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5 text-[13px] text-white/55">
                <span className="font-devanagari text-brand-gold text-base">{product.sanskrit}</span>
                <span>· {product.meaning}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={product.status} variant={product.statusVariant} />
        </div>

        <p className="text-brand-gold text-[14px] font-medium mb-3.5">{product.tagline}</p>
        <p className="text-white/[0.72] leading-[1.65] mb-6">{product.description}</p>

        <ul className="list-none p-0 m-0 mb-7 flex flex-col gap-2.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[14px] text-white/70">
              <span className="text-brand-gold inline-flex">
                <CheckIcon />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center gap-4 pt-5 border-t border-white/[0.06]">
          <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
            {product.platforms.map((p) => (
              <li
                key={p}
                className="px-2.5 py-[5px] rounded-lg text-xs text-white/65"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                {p}
              </li>
            ))}
          </ul>
          {product.href ? (
            <span className="inline-flex items-center gap-1.5 text-[14px] text-brand-gold font-medium">
              Visit <ArrowRight />
            </span>
          ) : (
            <span className="text-[13px] text-white/55">In development</span>
          )}
        </div>
      </div>
    </>
  );

  if (product.href) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className="glass glass-accent glass-interactive relative overflow-hidden block no-underline text-inherit"
        style={{ padding: '36px 32px' }}
      >
        {inner}
      </a>
    );
  }
  return (
    <div className="glass glass-accent relative overflow-hidden" style={{ padding: '36px 32px' }}>
      {inner}
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="section">
      <div className="container-full">
        <SectionHeading
          eyebrow="Our Products"
          title={
            <>
              Two AI products. <span className="gold-text">One philosophy.</span>
            </>
          }
          subtitle="Different domains, same belief: AI should help you think more clearly, not less."
        />

        <div
          className="grid gap-6 mt-14"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}
        >
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
