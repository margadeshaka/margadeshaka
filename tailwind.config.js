/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#0a0a1a',
          blue: '#1e1e3f',
          purple: '#483d8b',
          gold: '#ffd700',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #000000, #0a0a1a, #1e1e3f)',
      },
    },
  },
  plugins: [],
};