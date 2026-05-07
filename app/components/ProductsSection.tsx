type Product = {
  name: string;
  tagline: string;
  description: string;
  status: 'Live' | 'In Beta' | 'Coming Soon';
  platforms: string[];
  href: string | null;
  accent: 'gold' | 'purple';
};

const products: Product[] = [
  {
    name: 'Sakha',
    tagline: 'AI Vedic astrology companion',
    description:
      'Birth chart analysis, Vimshottari Dasha predictions, relationship compatibility, and emotionally aware coaching — built on Swiss Ephemeris and Azure OpenAI.',
    status: 'In Beta',
    platforms: ['iOS', 'Android', 'Web'],
    href: 'https://sakha.live',
    accent: 'gold',
  },
  {
    name: 'Dronacharya',
    tagline: 'AI tutor that teaches by thinking',
    description:
      'Multi-agent AI tutoring with adaptive difficulty and project-based Bronze, Silver, and Gold certifications. Active learning, not passive video.',
    status: 'Coming Soon',
    platforms: ['Web'],
    href: null,
    accent: 'purple',
  },
];

const statusBadge: Record<Product['status'], string> = {
  Live: 'bg-aurora-500/15 text-aurora-400 border-aurora-500/30',
  'In Beta': 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
  'Coming Soon': 'bg-white/5 text-white/50 border-white/10',
};

const accentClass: Record<Product['accent'], string> = {
  gold: 'from-brand-gold/30 via-brand-gold/10 to-transparent',
  purple: 'from-cosmic-purple-600/30 via-cosmic-purple-600/10 to-transparent',
};

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-24 px-6 max-w-7xl mx-auto" aria-labelledby="products-heading">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Our Products</span>
        <h2 id="products-heading" className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Two AI products. One philosophy.
        </h2>
        <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
          Different domains, same belief: AI should help you think more clearly, not less.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <article
            key={product.name}
            className="glass-card glass-card-accent relative p-8 sm:p-10 overflow-hidden"
          >
            <div
              className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-radial blur-3xl pointer-events-none ${accentClass[product.accent]}`}
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-brand-gold text-sm font-medium">{product.tagline}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge[product.status]}`}>
                  {product.status}
                </span>
              </div>

              <p className="text-white/75 leading-relaxed mb-8">{product.description}</p>

              <div className="flex items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-2 text-xs text-white/50">
                  {product.platforms.map((p) => (
                    <li key={p} className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{p}</li>
                  ))}
                </ul>

                {product.href ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-gold hover:text-brand-gold-light transition-colors"
                    aria-label={`Visit ${product.name}`}
                  >
                    Visit
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-sm text-white/30">In development</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
