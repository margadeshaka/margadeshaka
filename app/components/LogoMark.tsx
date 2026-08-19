/**
 * Brand mark — the open-book "Margadeshaka" glyph.
 *
 * From the claude.ai/design handoff (shared.jsx: LogoMark → assets/book-logo.svg).
 * The design deliberately uses the bare book silhouette rather than a solid disc.
 *
 * Note: the handoff applies a `.logo-book` class but never defines it, so the
 * mark is flat in the prototype even though its comment describes a drop-shadow
 * tracing the silhouette. We define `.logo-book` in globals.css (LAYER 5) to
 * supply that glow.
 *
 * The 122/120 height ratio is the source SVG's aspect ratio — keep it so the
 * mark never squashes when a caller passes a single `size`.
 */
type Props = { size?: number; className?: string; style?: React.CSSProperties };

export default function LogoMark({ size = 32, className, style }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // ?v=2 busts caches that stored the short-lived green repaint of this
      // SVG (assets ship with a day of max-age + a week of SWR).
      src="/assets/book-logo.svg?v=2"
      alt=""
      className={['logo-book', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size * (122 / 120), display: 'block', flex: 'none', ...style }}
      aria-hidden="true"
    />
  );
}
