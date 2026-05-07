export default function FounderSection() {
  return (
    <section id="founder" className="relative py-24 px-6 max-w-5xl mx-auto" aria-labelledby="founder-heading">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Founder</span>
        <h2 id="founder-heading" className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Built by a small, opinionated team
        </h2>
      </div>

      <div className="glass-card-elevated p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <div className="absolute inset-0 rounded-full bg-saffron-gradient blur-xl opacity-40" aria-hidden="true" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-brand-gold via-brand-gold-light to-brand-gold-amber flex items-center justify-center">
                <span className="font-display text-5xl font-bold text-navy-950">HG</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-1">Hitesh Gupta</h3>
            <p className="text-brand-gold text-sm font-medium mb-4">Founder &amp; CEO</p>

            <div className="space-y-3 text-white/75 leading-relaxed">
              <p>
                {/* TODO: Replace with full founder bio. Keep it 2-3 paragraphs, mention prior work,
                    why you started Margadeshaka, and what you believe about AI. */}
                Founder of Margadeshaka, building AI products at the intersection of Indian
                wisdom traditions and modern multi-agent systems. Currently shipping Sakha
                (Vedic astrology companion) on iOS, Android, and Web, with Dronacharya in
                development.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/hiteshgupta3012/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-btn text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/40 text-white/80 hover:text-brand-gold transition-colors"
                aria-label="Founder on LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 18v-7.5h-2V18h2zM7.5 9.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zM18 18v-4.3c0-2-1.1-3-2.6-3-1.2 0-1.7.7-2 1.2v-1H11v7.1h2v-3.7c0-1 .2-1.9 1.4-1.9s1.2 1.1 1.2 2V18h2.4z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/ihiteshgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-btn text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/40 text-white/80 hover:text-brand-gold transition-colors"
                aria-label="Founder on GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.4.7-4.1-1.6-4.1-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                </svg>
                GitHub
              </a>
              <a
                href="mailto:founder@margadeshaka.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-btn text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/40 text-white/80 hover:text-brand-gold transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
