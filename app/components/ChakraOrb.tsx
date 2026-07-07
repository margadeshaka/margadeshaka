/**
 * Hero emblem: the Margadeshaka logo mark (open book + path) with a soft,
 * book-shaped gold glow that gently breathes and floats. No circular frame —
 * the glow traces the book silhouette via a blurred duplicate + drop-shadow.
 *
 * Source: design bundle from claude.ai/design (home.jsx → ChakraOrb).
 */
export default function ChakraOrb() {
  return (
    <div className="relative float w-[240px] h-[240px] flex items-center justify-center">
      {/* Book-shaped breathing glow — blurred duplicate behind the mark */}
      <img
        src="/images/margadeshaka-logo.svg"
        alt=""
        aria-hidden="true"
        className="pulse-slow absolute w-[180px] h-auto pointer-events-none"
        style={{ filter: 'blur(16px) saturate(1.3)' }}
      />

      {/* Crisp logo mark with a subtle book-shaped glow */}
      <img
        src="/images/margadeshaka-logo.svg"
        alt=""
        aria-hidden="true"
        width={180}
        height={180}
        className="relative w-[180px] h-auto"
        style={{ filter: 'drop-shadow(0 0 14px rgba(255,200,100,0.45))' }}
      />
    </div>
  );
}
