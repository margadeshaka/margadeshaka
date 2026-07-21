import ChakraOrb from './ChakraOrb';

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg overflow-hidden pt-[120px] pb-20 px-6">
      <div className="container-narrow relative z-[2] text-center">
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
          Home of <span className="text-brand-gold">Sakha</span>, an AI Vedic astrology companion,
          and <span className="text-brand-gold">Dronacharya</span>, an interactive AI learning platform.
        </p>

        {/* CTAs */}
        <div className="fade-up delay-400 flex flex-wrap gap-3 justify-center">
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
      </div>
    </section>
  );
}
