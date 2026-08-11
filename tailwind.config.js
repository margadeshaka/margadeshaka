/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sakha brand family — single source of truth
        // (matches Sakha/docs/DESIGN_TOKENS.md)
        brand: {
          gold: '#67B274',
          'gold-light': '#6CC67B',
          'gold-amber': '#3FAC52',
          'gold-core': '#8ED49A',
        },
        saffron: {
          50: '#030303', 100: '#CDF5D4', 200: '#FEF08A', 300: '#FDE047',
          400: '#FACC15', 500: '#328240', 600: '#CA8A04', 700: '#A16207',
          800: '#854D0E', 900: '#713F12', 950: '#422006',
        },
        navy: {
          50: '#F0F1F8', 100: '#D8DAE8', 200: '#B0B4D1', 300: '#888DBA',
          400: '#6066A3', 500: '#48457F', 600: '#362F64', 700: '#241E49',
          800: '#16122F', 900: '#0C0A1D', 950: '#06050F',
        },
        'cosmic-purple': {
          400: '#A67EE8', 500: '#8B5CF6', 600: '#7E4DD4',
          700: '#6538B8', 800: '#4C2B8A',
        },
        aurora: {
          400: '#12FF3B', 500: '#00C522', 600: '#009219', 700: '#005F10',
        },
        // Legacy alias for backward compatibility with existing chakra components
        cosmic: {
          dark: '#06050F',     // → navy.950
          blue: '#0C0A1D',     // → navy.900
          purple: '#7E4DD4',   // → cosmic-purple.600
          gold: '#67B274',     // → brand.gold
        },
      },
      // Point at the design tokens defined in globals.css LAYER 4, not at raw
      // next/font variables. The previous values (--font-poppins, --font-inter,
      // --font-noto-devanagari) were left behind when the type stack moved to
      // Newsreader/Geist: none of them is defined anywhere any more, so
      // `font-display` computed to an invalid var() and every heading carrying
      // it silently fell back to the inherited sans face instead of Newsreader.
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        devanagari: ['var(--font-devanagari)', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-lg': ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['44px', { lineHeight: '1.1', fontWeight: '700' }],
        'display-sm': ['36px', { lineHeight: '1.15', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.25', fontWeight: '700' }],
        'headline-md': ['28px', { lineHeight: '1.25', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
      },
      borderRadius: {
        'glass': '18px',
        'card': '24px',
        'btn': '14px',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(180deg, #06050F 0%, #0C0A1D 50%, #1E1B4B 100%)',
        'saffron-gradient': 'linear-gradient(90deg, #328240 0%, #67B274 50%, #328240 100%)',
        'aurora-gradient': 'linear-gradient(90deg, #00C522 0%, #009219 100%)',
        'cosmic-purple-gradient': 'linear-gradient(90deg, #7E4DD4 0%, #6538B8 100%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'drift': 'drift 90s linear infinite',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
};
