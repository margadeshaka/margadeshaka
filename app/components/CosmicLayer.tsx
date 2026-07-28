/**
 * Cosmic background layer — the twinkling starfield behind all content.
 *
 * From the claude.ai/design handoff (shared.jsx: CosmicLayer), which scatters
 * 60 stars with Math.random(). Random values can't be used directly here: this
 * site is a static export, so the server-rendered HTML and the client's first
 * render must agree or React reports a hydration mismatch. The positions are
 * therefore drawn from a seeded PRNG with a fixed seed — same visual scatter,
 * identical output every render.
 *
 * Server-rendered, no client JS. The drifting CSS starfield layers and the
 * aurora blobs are additive and stay from the previous design.
 */

// mulberry32 — small, fast, deterministic.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS = (() => {
  const rand = seeded(0x5a4b1a);
  const rng = (min: number, max: number) => min + rand() * (max - min);
  return Array.from({ length: 60 }, () => ({
    left: rng(0, 100),
    top: rng(0, 100),
    size: rng(1, 1.8),
    dur: rng(3, 7),
    delay: rng(0, 6),
    bright: rand() < 0.12,
  }));
})();

export default function CosmicLayer() {
  return (
    <>
      <div className="starfield" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${s.left.toFixed(3)}%`,
              top: `${s.top.toFixed(3)}%`,
              width: Number(s.size.toFixed(3)),
              height: Number(s.size.toFixed(3)),
              background: 'rgba(255,255,255,0.7)',
              boxShadow: s.bright ? '0 0 3px 1px rgba(255,255,255,0.35)' : 'none',
              animationDuration: `${s.dur.toFixed(3)}s`,
              animationDelay: `${s.delay.toFixed(3)}s`,
            }}
          />
        ))}
      </div>

      {/* Drifting CSS star layers + aurora blobs — additive ambiance retained
          from the previous design; the handoff keeps .stars in its stylesheet. */}
      <div className="stars stars-dense" aria-hidden="true" />
      <div
        className="aurora-blob"
        style={{ top: '10%', left: '12%', width: 380, height: 380, background: 'rgba(255, 200, 100, 0.07)' }}
        aria-hidden="true"
      />
      <div
        className="aurora-blob"
        style={{ bottom: '12%', right: '8%', width: 460, height: 460, background: 'rgba(126, 77, 212, 0.09)' }}
        aria-hidden="true"
      />
      <div
        className="aurora-blob"
        style={{ top: '60%', left: '55%', width: 320, height: 320, background: 'rgba(0, 230, 170, 0.05)' }}
        aria-hidden="true"
      />
    </>
  );
}
