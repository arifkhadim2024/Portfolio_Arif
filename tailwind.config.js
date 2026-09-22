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
          bg: '#080808',
          space: '#0D0D0D',
          card: '#0F0F0F',
          cardBorder: 'rgba(185, 161, 107, 0.16)',
          cardHover: '#161616',
          surface: '#141414',
          muted: '#A39E93',
          text: '#F2F0EA',
          charcoal: '#222222',
          charcoalDeep: '#1A1A1A',
          bronze: '#1B1712',
        },
        light: {
          bg: '#F2F0EA',
          card: '#FFFFFF',
          cardBorder: '#D8D6D0',
          cardHover: '#E8E6E0',
          surface: '#E8E6E0',
          muted: '#666660',
          text: '#080808',
        },
        editorial: {
          50: '#FDFCF9',
          100: '#F2F0EA',
          200: '#E8E6E0',
          300: '#D8D6D0',
          400: '#B9A16B', // Refined Warm Metallic Accent
          500: '#9E8652',
          600: '#856F3F',
          700: '#695730',
          800: '#4D3F22',
          900: '#222222',
        },
        accent: {
          warm: '#B9A16B',
          offWhite: '#F2F0EA',
          charcoal: '#222222',
          obsidian: '#080808',
          surface: '#141414',
          gold: '#B9A16B',
          radiant: '#D4AF37',
          champagne: '#E8E6E0',
        },
        gold: {
          50: '#FDFCF9',
          100: '#F2F0EA',
          200: '#E8E6E0',
          300: '#D8D6D0',
          400: '#B9A16B', // Restrained Warm Accent
          500: '#B9A16B',
          600: '#9E8652',
          700: '#856F3F',
          800: '#695730',
          900: '#222222',
          DEFAULT: '#B9A16B',
        },
        primary: {
          50: '#FDFCF9',
          100: '#F2F0EA',
          200: '#E8E6E0',
          300: '#D8D6D0',
          400: '#B9A16B',
          500: '#B9A16B',
          600: '#9E8652',
          700: '#856F3F',
          800: '#695730',
          900: '#222222',
          DEFAULT: '#B9A16B',
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
        'spin-slow': 'spin 24s linear infinite',
        'shimmer-warm': 'shimmer 3s ease-in-out infinite',
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
          '50%': { transform: 'translateY(-10px)' },
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
        'editorial-card': '0 20px 45px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 0 rgba(242, 240, 234, 0.05)',
        'editorial-accent': '0 0 25px -5px rgba(185, 161, 107, 0.25)',
        'card-dark': '0 16px 40px -12px rgba(0, 0, 0, 0.85)',
        'card-light': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      }
    },
  },
  plugins: [],
}
