/**
 * Hero emblem — the Margadeshaka open-book logo, shown large on the cosmic
 * background with a gentle float. No glow/halo behind it.
 *
 * Mark: assets/margadeshaka-mark.svg (imported to /public) from the
 * claude.ai/design bundle.
 */
export default function ChakraOrb() {
  return (
    <div className="relative w-[240px] h-[240px] float grid place-items-center">
      {/* Margadeshaka book-mark logo — the hero centerpiece */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/margadeshaka-mark.svg"
        alt="Margadeshaka"
        style={{ width: 200, height: 203 }}
      />
    </div>
  );
}
