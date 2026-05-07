export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 px-6 max-w-5xl mx-auto" aria-labelledby="contact-heading">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">Get in touch</span>
        <h2 id="contact-heading" className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Let&apos;s talk
        </h2>
        <p className="mt-4 text-white/60 max-w-xl mx-auto">
          Investors, partners, press, or future hires — we read every email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="mailto:founder@margadeshaka.com"
          className="glass-card-interactive p-6 text-center group"
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Email</p>
          <p className="text-white font-medium">founder@margadeshaka.com</p>
        </a>

        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cosmic-purple-600/10 border border-cosmic-purple-600/30 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cosmic-purple-400" aria-hidden="true">
              <path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Based in</p>
          <p className="text-white font-medium">India</p>
          <p className="text-white/50 text-sm mt-1">Remote-first team</p>
        </div>

        <a
          href="https://sakha.live"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card-interactive p-6 text-center group"
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-aurora-500/10 border border-aurora-500/30 flex items-center justify-center group-hover:bg-aurora-500/20 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aurora-500" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Try our product</p>
          <p className="text-white font-medium">sakha.live</p>
          <p className="text-white/50 text-sm mt-1">Beta on iOS &amp; Android</p>
        </a>
      </div>
    </section>
  );
}
