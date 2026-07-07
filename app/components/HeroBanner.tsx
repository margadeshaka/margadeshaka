import ChakraOrb from './ChakraOrb';

const trustItems = [
  { kicker: 'Incorporated', value: '4 Mar 2025', sub: 'Companies Act, 2013', mono: false },
  { kicker: 'DPIIT Startup', value: 'DIPP215241', sub: 'Valid until 2035', mono: true },
  { kicker: 'Products live', value: 'Sakha · Beta', sub: 'iOS · Android · Web', mono: false },
];

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden pt-[120px] pb-20 px-6">
      <div className="container-narrow relative z-[2] text-center">
        {/* Trust badge — DPIIT pill */}
        <div className="fade-up mb-9">
          <a href="/compliance" className="badge !py-[10px] !px-[18px] !text-[13px] hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-colors">
            <span className="gold-dot" style={{ background: '#4FE9C0' }} aria-hidden="true" />
            <span className="text-brand-gold font-semibold">DPIIT Recognized Startup</span>
            <span className="font-mono text-brand-gold/[0.65] text-[11px]">DIPP215241</span>
            <span className="text-brand-gold/40">·</span>
            <span className="text-white/60 inline-flex items-center gap-1">
              Verify
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* ChakraOrb */}
        <div className="fade-up delay-100 flex justify-center mb-10">
          <ChakraOrb />
        </div>

        {/* Headline */}
        <h1
          className="fade-up delay-200 font-display"
          style={{
            fontSize: 'clamp(40px, 7vw, 84px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            marginBottom: 24,
          }}
        >
          <span className="text-white">AI for </span>
          <span className="gold-text">guidance &amp; learning</span>
        </h1>

        {/* Subhead */}
        <p
          className="fade-up delay-300 text-white/[0.72] max-w-[640px] mx-auto"
          style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 40 }}
        >
          Margadeshaka builds AI products that help you navigate life and master new skills.
          Home of <span className="text-brand-gold">Sakha</span>, an AI companion for emotional clarity,
          and <span className="text-brand-gold">Dronacharya</span>, an interactive AI learning platform.
        </p>

        {/* CTAs */}
        <div className="fade-up delay-400 flex flex-wrap gap-3 justify-center mb-20">
          <a
            href="https://sakha.live"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Try Sakha
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#products" className="btn btn-secondary">
            Explore products
          </a>
        </div>

        {/* Trust strip */}
        <div
          className="fade-up delay-500 grid gap-px max-w-[760px] mx-auto overflow-hidden"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
          }}
        >
          {trustItems.map((s) => (
            <div key={s.kicker} className="text-center px-4 py-5" style={{ background: 'rgba(6,5,15,0.4)' }}>
              <div className="text-[10px] uppercase text-white/[0.45] mb-1.5" style={{ letterSpacing: '0.18em' }}>
                {s.kicker}
              </div>
              <div
                className={`text-brand-gold font-semibold text-lg ${s.mono ? 'font-mono' : 'font-display'}`}
              >
                {s.value}
              </div>
              <div className="text-xs text-white/50 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
