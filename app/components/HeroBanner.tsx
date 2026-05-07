export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden pt-20 pb-16">
      <div className="stars" aria-hidden="true" />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-gold/[0.06] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cosmic-purple-600/[0.08] blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-8">
          <a
            href="/compliance"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-colors"
            aria-label="View DPIIT recognition certificate"
          >
            <span className="w-2 h-2 rounded-full bg-aurora-500 animate-pulse" aria-hidden="true" />
            <span className="text-sm text-brand-gold font-medium tracking-wide">
              DPIIT Recognized Startup
            </span>
            <span className="text-xs font-mono text-brand-gold/60">DIPP215241</span>
          </a>
        </div>

        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <div className="absolute inset-0 rounded-full bg-saffron-gradient blur-2xl opacity-50 animate-pulse-slow" aria-hidden="true" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-brand-gold via-brand-gold-light to-brand-gold-amber shadow-[0_0_60px_rgba(255,200,100,0.5)]" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-devanagari text-3xl sm:text-4xl font-bold text-navy-950" aria-hidden="true">
                मार्ग
              </span>
            </div>
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          <span className="text-white">AI for </span>
          <span className="bg-gradient-to-r from-brand-gold-amber via-brand-gold to-brand-gold-light bg-clip-text text-transparent">
            Guidance & Learning
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Margadeshaka builds AI products that help you navigate life and master new skills.
          Home of <span className="text-brand-gold">Sakha</span>, an AI Vedic astrology companion,
          and <span className="text-brand-gold">Dronacharya</span>, an interactive AI learning platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://sakha.live" target="_blank" rel="noopener noreferrer" className="btn-primary text-base">
            Try Sakha
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#products" className="btn-secondary text-base">
            Explore products
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: '2', label: 'AI products' },
            { value: 'iOS · Android · Web', label: 'Platforms' },
            { value: 'Beta', label: 'Stage' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg sm:text-xl font-bold text-brand-gold">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
