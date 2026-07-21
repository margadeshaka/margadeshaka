import type { CSSProperties, ReactNode } from 'react';
import type { BlogCategory, BlogPost } from '../../data/blogPosts';

/**
 * Shared, hook-free building blocks for the blog listing and article views.
 * Presentational only, so these render equally well from server or client
 * components. Ported from the design bundle (blog.jsx: ACCENTS / CAT_META /
 * chip / CatChip / MetaLine).
 */

type IconProps = { width?: number; height?: number; className?: string };

const strokeProps = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ArrowRight({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowLeft({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export function StarIcon({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className={className} aria-hidden="true" {...strokeProps}>
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function SparklesIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className={className} aria-hidden="true" {...strokeProps}>
      <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3z" />
      <path d="M19 14l-.7 2.1L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.9L19 14z" />
    </svg>
  );
}

export function BookIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function ShieldIcon({ width = 20, height = 20, className }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className={className} aria-hidden="true" {...strokeProps}>
      <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// Every accent resolves to the saffron gold thread — the design deliberately
// unifies all post accents to gold, keeping `accent` in the data only as a
// forward-looking hook.
export const ACCENT = {
  color: 'var(--brand-gold)',
  bg: 'rgba(255, 200, 100, 0.10)',
  border: 'rgba(255, 200, 100, 0.28)',
} as const;

type CatMeta = { Icon: (p: IconProps) => ReactNode; glyph: string };

const CAT_META: Record<BlogCategory, CatMeta> = {
  Vision: { Icon: StarIcon, glyph: '✷' },
  Engineering: { Icon: SparklesIcon, glyph: '✺' },
  Product: { Icon: BookIcon, glyph: '❈' },
  Trust: { Icon: ShieldIcon, glyph: '❊' },
};

export function catMeta(category: BlogCategory): CatMeta {
  return CAT_META[category] ?? CAT_META.Vision;
}

export function chip(): CSSProperties {
  return {
    padding: '5px 12px',
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    background: ACCENT.bg,
    border: `1px solid ${ACCENT.border}`,
    color: ACCENT.color,
  };
}

export function CatChip({ post }: { post: BlogPost }) {
  const { Icon } = catMeta(post.category);
  return (
    <span style={{ ...chip(), display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <Icon width={12} height={12} />
      {post.category}
    </span>
  );
}

export function MetaLine({ post }: { post: BlogPost }) {
  return (
    <span
      style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
    >
      {post.date} <span style={{ opacity: 0.4 }}>·</span> {post.readTime}
    </span>
  );
}
