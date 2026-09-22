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
          bg: '#050505',
          space: '#080808',
          card: '#0D0C0A',
          cardBorder: 'rgba(212, 175, 55, 0.16)',
          cardHover: '#14120E',
          surface: '#100F0D',
          muted: '#A89E8D',
          text: '#FFF8E7',
          bronze: '#17120A',
          charcoal: '#1A1815',
        },
        light: {
          bg: '#FBF9F4',
          card: '#FFFFFF',
          cardBorder: '#E6DCB8',
          cardHover: '#F7F3E8',
          surface: '#FFFFFF',
          muted: '#78716C',
          text: '#17120A',
        },
        gold: {
          50: '#FDFBF4',
          100: '#FBF6E4',
          200: '#F5EBC5',
          300: '#F3E8CB', // Champagne
          400: '#F5C542', // Radiant secondary gold
          500: '#D4AF37', // Metallic gold primary
          600: '#C9A227',
          700: '#94771C',
          800: '#6E5713',
          900: '#47370A',
          DEFAULT: '#D4AF37',
        },
        primary: {
          50: '#FDFBF4',
          100: '#FBF6E4',
          200: '#F5EBC5',
          300: '#F3E8CB',
          400: '#F5C542',
          500: '#D4AF37',
          600: '#C9A227',
          700: '#94771C',
          800: '#6E5713',
          900: '#47370A',
          DEFAULT: '#D4AF37',
        },
        accent: {
          gold: '#D4AF37',
          radiant: '#F5C542',
          amber: '#F59E0B',
          champagne: '#F3E8CB',
          warmWhite: '#FFF8E7',
          bronze: '#8A7444',
          obsidian: '#080808',
          void: '#050505',
        }
      },
      fontFamily: {
        display: ['"Cinzel"', '"Syne"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'spin-slow': 'spin 22s linear infinite',
        'shimmer-gold': 'shimmer 3s ease-in-out infinite',
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
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        }
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(212, 175, 55, 0.4)',
        'glow-gold': '0 0 30px -5px rgba(212, 175, 55, 0.45)',
        'glow-champagne': '0 0 25px -5px rgba(243, 232, 203, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'card-dark': '0 16px 40px -12px rgba(0, 0, 0, 0.85)',
        'card-gold': '0 12px 36px -10px rgba(212, 175, 55, 0.18)',
        'card-light': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      }
    },
  },
  plugins: [],
}
