/**
 * Inline Lucide-style icon set, ported verbatim from the claude.ai/design
 * handoff (shared.jsx: the `I` object). Kept as inline SVG rather than an
 * icon package so the static export ships no extra JS for them.
 */
type P = React.SVGProps<SVGSVGElement>;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// The arrows deliberately omit strokeLinejoin so the arrowhead vertex keeps the
// default miter, matching the handoff (shared.jsx: arrowRight/arrowLeft set only
// strokeLinecap). Rounding the join blunts the tip.
const strokeNoJoin = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const };

export const ArrowRight = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...strokeNoJoin} {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...strokeNoJoin} {...p}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const Search = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const External = (p: P) => (
  // Also miter-joined in the handoff (shared.jsx: external).
  <svg width="14" height="14" viewBox="0 0 24 24" {...strokeNoJoin} {...p}>
    <path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

export const Check = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" {...stroke} strokeWidth={2.5} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Shield = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Doc = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

export const Download = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export const Copy = (p: P) => (
  <svg width="13" height="13" viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const Mail = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Star = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const Sparkles = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3z" />
    <path d="M19 14l-.7 2.1L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.9L19 14z" />
  </svg>
);

export const Book = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export const LinkedIn = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 18v-7.5h-2V18h2zM7.5 9.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zM18 18v-4.3c0-2-1.1-3-2.6-3-1.2 0-1.7.7-2 1.2v-1H11v7.1h2v-3.7c0-1 .2-1.9 1.4-1.9s1.2 1.1 1.2 2V18h2.4z" />
  </svg>
);

export const GitHub = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.4.7-4.1-1.6-4.1-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg width="17" height="17" viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const Apple = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16.36 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.15.76 1.11 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.24.87-1.28 1.23-2.53 1.25-2.6-.03-.01-2.4-.92-2.42-3.65zM14.13 5.36c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.03.08 2.08-.52 2.71-1.29z" />
  </svg>
);

export const GooglePlay = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...p}>
    <path d="M3.36 2.24a1.2 1.2 0 0 0-.53.99v17.54c0 .43.2.79.53.99l9.6-9.76-9.6-9.76z" fill="#00d3ff" />
    <path d="M16.9 8.02 5.02 1.4a1.18 1.18 0 0 0-1.66.84l9.6 9.76 3.94-3.98z" fill="#00e676" />
    <path d="m12.96 12 3.94 3.98-11.88 6.62a1.18 1.18 0 0 1-1.66-.84L12.96 12z" fill="#ff3b46" />
    <path d="M16.9 8.02 12.96 12l3.94 3.98 3.5-1.95c.86-.48.86-1.6 0-2.08l-3.5-1.93z" fill="#ffc900" />
  </svg>
);
