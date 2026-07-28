/**
 * Home hero, ported from the handoff (home.jsx: Hero + HeroLogo).
 *
 * The redesign strips the hero right back: brand emblem, one headline, one
 * paragraph, no buttons. The emblem is a bare mark with a book-shaped
 * breathing glow (`.logo-orb--hero`) rather than a disc or orbit ring.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="cosmic-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
    >
      <div
        className="container-narrow"
        style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
      >
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <div
            className="float"
            style={{
              position: 'relative',
              width: 150,
              height: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="logo-orb logo-orb--hero" aria-hidden="true" />
          </div>
        </div>

        <h1
          className="fade-up delay-100"
          style={{
            fontSize: 'clamp(40px, 6.4vw, 72px)',
            fontWeight: 500,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.01em',
          }}
        >
          <span style={{ color: '#fff' }}>Find clarity when life feels </span>
          <span className="gold-text">uncertain.</span>
        </h1>

        <p
          className="fade-up delay-200"
          style={{
            fontSize: 19,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: 620,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Margadeshaka is building AI that helps you reflect, think clearly, and navigate life&rsquo;s
          decisions with confidence. Meet <span style={{ color: 'var(--brand-gold)' }}>Sakha</span>,
          your thoughtful companion for guidance and self-discovery.
        </p>
      </div>
    </section>
  );
}
