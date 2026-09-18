/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#070709',
          card: '#0D0C12',
          cardBorder: 'rgba(139, 92, 246, 0.12)',
          cardHover: '#161421',
          surface: '#12101A',
          muted: '#9E9AA8',
          text: '#FDFBF7',
        },
        light: {
          bg: '#FAF8F5',
          card: '#FFFFFF',
          cardBorder: '#EADECE',
          cardHover: '#F4EFE6',
          surface: '#FFFFFF',
          muted: '#78716C',
          text: '#1C1917',
        },
        primary: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          DEFAULT: '#7C3AED',
        },
        accent: {
          violet: '#8B5CF6',
          magenta: '#D946EF',
          plum: '#C026D3',
          gold: '#E5C07B',
          amber: '#F59E0B',
          champagne: '#F3E8CB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'spin-slow': 'spin 16s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
        'glow-magenta': '0 0 25px -5px rgba(217, 70, 239, 0.35)',
        'glow-gold': '0 0 25px -5px rgba(229, 192, 123, 0.3)',
        'card-dark': '0 12px 36px -10px rgba(0, 0, 0, 0.7)',
        'card-light': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      }
    },
  },
  plugins: [],
}
