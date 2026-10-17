/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme: warm black + cream + acid lime, with a warm coral second accent.
        // To try another accent, change the emerald scale (and the --accent vars in index.css).
        bg: '#0b0b09',
        accent: {
          DEFAULT: '#c8f05a',
          soft: 'rgba(200,240,90,0.12)',
          glow: 'rgba(200,240,90,0.35)',
        },
        emerald: {
          50: '#f7fde8', 100: '#eefbcf', 200: '#e1f7a3', 300: '#d4f56a', 400: '#c8f05a',
          500: '#b5e03c', 600: '#93ba25', 700: '#6f8d1c', 800: '#4d621a', 900: '#344216', 950: '#1c2509',
        },
        violet: {
          50: '#fff4ee', 100: '#ffe4d6', 200: '#ffc9ad', 300: '#ffab85', 400: '#ff8f63',
          500: '#f7743f', 600: '#dc5a27', 700: '#b5451d', 800: '#8c361b', 900: '#6b2c19', 950: '#3a140a',
        },
        slate: {
          50: '#faf8f3', 100: '#f3efe6', 200: '#e6e1d6', 300: '#d2ccc0', 400: '#b3ada2',
          500: '#8f8a84', 600: '#6b6761', 700: '#47443f', 800: '#2a2825', 900: '#1a1917', 950: '#0f0e0c',
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
