/**
 * Sakha sprout — the brand mark, growing one part at a time.
 *
 * Geometry and timeline are ported verbatim from the iOS splash so the web and
 * the app tell the same story:
 *   ~/Projects/sakha/ios/Sakha/Screens/Splash/SplashView.swift
 * which in turn takes its paths from the logo handoff's `sakha-mark.svg`
 * (viewBox 0 0 100 140). Keep the three path strings byte-identical to the
 * Swift `Shape`s below them — they are the same curves:
 *   StemShape       → .sakha-sprout-stem
 *   LeafLowerShape  → left leaf   (drawn 2nd)
 *   LeafUpperShape  → right leaf  (drawn 3rd)
 *
 * Sequence is strictly one at a time, nothing overlaps: stem draws from the
 * ground up, then the left leaf opens, then the right, then the bud kindles.
 * Durations live in globals.css (1.0 / 0.32 / 0.32 / 0.3s) and are the iOS
 * budget exactly.
 *
 * The bud sits detached from the stem tip — per the handoff's rules the gap is
 * the point, so don't "fix" it by extending the stem to meet it.
 */
type Props = { className?: string; title?: string };

export default function SakhaSprout({ className, title = 'Sakha' }: Props) {
  return (
    <svg
      className={['sakha-sprout', className].filter(Boolean).join(' ')}
      viewBox="0 0 100 140"
      role="img"
      aria-label={title}
    >
      <defs>
        {/* SwiftUI: LinearGradient(#FFE4B5 → #E89620, .topLeading → .bottomTrailing) */}
        <linearGradient id="sakhaLeafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE4B5" />
          <stop offset="100%" stopColor="#E89620" />
        </linearGradient>
        {/* SwiftUI: RadialGradient(center: (0.38, 0.32), endRadius: 0.72 · d) */}
        <radialGradient id="sakhaBudGrad" cx="0.38" cy="0.32" r="0.72">
          <stop offset="0%" stopColor="#FFFDF6" />
          <stop offset="44%" stopColor="#FFE9B0" />
          <stop offset="100%" stopColor="#FFC864" />
        </radialGradient>
      </defs>

      {/* Stem — StemShape, drawn base-first so it grows upward */}
      <path
        className="sakha-sprout-stem"
        d="M50 128 C50 104 46 86 50 68 C52 56 50 44 50 34"
        pathLength={1}
        fill="none"
        stroke="#FFC864"
        strokeWidth={4.5}
        strokeLinecap="round"
      />

      {/* Left leaf — LeafLowerShape */}
      <path
        className="sakha-sprout-leaf sakha-sprout-leaf--left"
        d="M50 96 C36 88 22 92 18 74 C36 72 46 82 50 96 Z"
        fill="url(#sakhaLeafGrad)"
      />

      {/* Right leaf — LeafUpperShape */}
      <path
        className="sakha-sprout-leaf sakha-sprout-leaf--right"
        d="M50 78 C64 70 78 74 82 56 C64 54 54 64 50 78 Z"
        fill="url(#sakhaLeafGrad)"
      />

      {/* Bud — r 11 centred at (50, 22) */}
      <circle className="sakha-sprout-bud" cx={50} cy={22} r={11} fill="url(#sakhaBudGrad)" />
    </svg>
  );
}
