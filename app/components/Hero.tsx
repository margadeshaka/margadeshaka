/**
 * Home hero, ported from the handoff (home.jsx: Hero + HeroLogo).
 *
 * The redesign strips the hero right back: brand emblem, one headline, one
 * paragraph, no buttons.
 *
 * The emblem is the handoff's gold orb: `<span className="logo-orb
 * logo-orb--hero">`, styled by `.logo-orb` / `.logo-orb--hero` in globals.css.
 *
 * History worth knowing before changing this again: bf656af and ca0e65f had
 * each swapped this orb out for the book LogoMark, on the grounds that the
 * handoff's own HeroLogo comment asks for "a bare logo mark with a book-shaped
 * breathing glow ... no circular halo" while the `.logo-orb` rule it points at
 * is a plain radial-gradient circle. That swap was reverted deliberately — the
 * orb is the requested hero mark. LogoMark is still used in the navbar/footer.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="cosmic-bg"
      style={{
        position: 'relative',
        /*
         * Not 100vh. The content is vertically centred, so every pixel the
         * hero is taller than its content splits above and below — on a tall
         * display that left ~230px of dead space under the paragraph before
         * the section padding even began. 86vh still fills the fold on a
         * laptop while cutting that trailing gap.
         */
        minHeight: '86vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* Top clears the fixed navbar; bottom is small because the section
           below contributes its own 60px. */
        padding: '104px 24px 32px',
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
          <span style={{ color: 'rgb(var(--fg-rgb))' }}>Find clarity when life feels </span>
          <span className="gold-text">uncertain.</span>
        </h1>

        <p
          className="fade-up delay-200"
          style={{
            fontSize: 19,
            color: 'rgb(var(--fg-rgb) / max(0.72, var(--fg-a-min)))',
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
