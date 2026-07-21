/**
 * Brand mark — the open-book "Margadeshaka" glyph.
 *
 * Ported from the claude.ai/design bundle (shared.jsx: LogoMark →
 * assets/margadeshaka-mark.svg). The design deliberately uses the book
 * silhouette rather than a solid disc; a soft gold drop-shadow traces it.
 * Rendered with a plain <img> because the project sets `images.unoptimized`.
 */
type Props = { size?: number; className?: string };

export default function LogoMark({ size = 34, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/margadeshaka-mark.svg"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{
        display: 'block',
        flex: 'none',
        filter: 'drop-shadow(0 0 10px rgba(255, 200, 100, 0.35))',
      }}
      aria-hidden="true"
    />
  );
}
