/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030712',
        accent: {
          DEFAULT: '#10b981',
          soft: 'rgba(16,185,129,0.12)',
          glow: 'rgba(16,185,129,0.35)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'aurora-1': 'aurora1 22s ease-in-out infinite',
        'aurora-2': 'aurora2 28s ease-in-out infinite',
        'aurora-3': 'aurora3 24s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        aurora1: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(40px,-60px) scale(1.15)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-60px,40px) scale(1.1)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(30px,30px) scale(0.95)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
