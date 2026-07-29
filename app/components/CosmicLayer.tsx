/**
 * Cosmic background layer — the starfield and aurora behind all content.
 *
 * Ported from the Sakha app's CosmicBackground, which the Android build states
 * most precisely (its aurora is explicit radial gradients rather than iOS's
 * blurred linear ones, so it translates to CSS exactly):
 *   ~/Projects/sakha/android/app/src/main/java/com/margadeshaka/sakha/ui/components/CosmicBackground.kt
 *
 * Star parameters are that file's, verbatim: 40 stars, x/y within 2–98%, size
 * 1–2.5px, alpha 0.4–0.8, and a twinkle whose opacity runs alpha×0.15 → alpha.
 * Stars never move — the app draws them at fixed points and varies only their
 * opacity, which is why nothing here animates position.
 *
 * The app's `time` runs 0→20π over 30s and each star twinkles at sin(time ×
 * speed + phase) with speed 2–4, so one blink takes 2π ÷ (20π/30 × speed) =
 * 3/speed seconds — 0.75s to 1.5s. That is the period used below.
 *
 * Positions come from a seeded PRNG rather than Math.random(): this site is a
 * static export, so the server-rendered HTML and the client's first render must
 * agree or React reports a hydration mismatch. (The app seeds Random(42) for
 * the same reason — identical stars on every screen.)
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
  const rand = seeded(42);
  const rng = (min: number, max: number) => min + rand() * (max - min);
  return Array.from({ length: 40 }, () => {
    const speed = rng(2, 4);
    return {
      left: rng(2, 98),
      top: rng(2, 98),
      size: rng(1, 2.5),
      alpha: rng(0.4, 0.8),
      dur: 3 / speed,
      // Stand-in for the app's per-star phase offset: a negative delay starts
      // each star part-way through its cycle so they blink out of step.
      delay: -rng(0, 3),
    };
  });
})();

export default function CosmicLayer() {
  return (
    <>
      <div className="starfield" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={
              {
                left: `${s.left.toFixed(3)}%`,
                top: `${s.top.toFixed(3)}%`,
                width: Number(s.size.toFixed(3)),
                height: Number(s.size.toFixed(3)),
                // Peak opacity, read by the twinkle keyframes.
                '--a': s.alpha.toFixed(3),
                animationDuration: `${s.dur.toFixed(3)}s`,
                animationDelay: `${s.delay.toFixed(3)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Painted star layers behind the twinkling ones — extra depth, static. */}
      <div className="stars stars-dense" aria-hidden="true" />

      <div className="cosmic-aurora" aria-hidden="true" />
      <div className="cosmic-vignette" aria-hidden="true" />
    </>
  );
}
