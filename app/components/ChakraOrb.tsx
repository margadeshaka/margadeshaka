/**
 * Animated chakra/sun emblem with serrated edge, spinning ring, breathing halo,
 * and Sanskrit मार्ग glyph in the centre. Used as the hero visual.
 *
 * Source: design bundle from claude.ai/design (home.jsx → ChakraOrb).
 */
export default function ChakraOrb() {
  const serrations = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);

  return (
    <div className="relative w-[220px] h-[220px] float">
      {/* Outer halo */}
      <div
        className="pulse-slow absolute -inset-[30px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 100, 0.5) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
        aria-hidden="true"
      />

      {/* Spinning serrated ring */}
      <svg
        className="spin-slow absolute inset-0 w-full h-full"
        viewBox="0 0 220 220"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD280" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>
        {serrations.map((a, i) => (
          <line
            key={a}
            x1="110"
            y1="20"
            x2="110"
            y2="40"
            stroke="url(#ringGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${a} 110 110)`}
            opacity={i % 2 ? 0.55 : 1}
          />
        ))}
        <circle cx="110" cy="110" r="68" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" opacity="0.55" />
        <circle cx="110" cy="110" r="56" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      {/* Gold core (clean — no inner glyph) */}
      <div
        className="absolute inset-9 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #FFE4B5 0%, #FFC864 45%, #EAB308 100%)',
          boxShadow: '0 0 60px rgba(255,200,100,0.55), inset 0 0 30px rgba(255,255,255,0.4)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
