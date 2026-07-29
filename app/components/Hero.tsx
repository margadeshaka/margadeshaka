import LogoMark from './LogoMark';

/**
 * Home hero, ported from the handoff (home.jsx: Hero + HeroLogo).
 *
 * The redesign strips the hero right back: brand emblem, one headline, one
 * paragraph, no buttons.
 *
 * The emblem is the real book mark, not a disc. The handoff's HeroLogo renders
 * `<span className="logo-orb logo-orb--hero">`, and its own comment says that
 * should be "a bare logo mark with a book-shaped breathing glow ... no circular
 * halo" — but the `.logo-orb` rule it points at is a plain gold radial-gradient
 * circle. So the handoff's markup contradicts its comment and puts an anonymous
 * orange ball above the fold. Develop's bf656af and this repo's own ca0e65f had
 * each already replaced that placeholder with the logo; rendering LogoMark here
 * keeps that decision instead of silently reverting it.
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
            <LogoMark size={150} className="logo-mark--hero" />
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
