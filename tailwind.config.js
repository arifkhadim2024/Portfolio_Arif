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
        blake: {
          900: 'var(--color-surface)',
          800: 'var(--color-bg)',
          700: 'var(--color-surface-card)',
          300: 'var(--color-border)',
        },
        brandRed: {
          DEFAULT: '#FF4848',
          hover: '#E03E3E',
        },
        accent: {
          primary: 'var(--accent-primary)',       // Electric Violet #7C3AED
          secondary: 'var(--accent-secondary)',   // Cyan #22D3EE
          tertiary: 'var(--accent-tertiary)',     // Hot Pink / Magenta #F472B6
          highlight: 'var(--accent-highlight)',   // Lime #A3E635
          warm: 'var(--accent-warm)',             // Warm Orange #FB923C
        },
        whiteTheme: {
          DEFAULT: 'var(--color-text)',
          300: 'var(--color-text)',
          200: 'var(--color-surface-card)',
          700: 'var(--color-text-muted)',
          muted: 'var(--color-text-subtle)',
        },
      },
      backgroundImage: {
        'gradient-signature': 'var(--gradient-signature)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-border': 'var(--gradient-border)',
        'gradient-mesh': 'var(--gradient-mesh)',
      },
      boxShadow: {
        'glow-violet': '0 0 30px rgba(124, 58, 237, 0.35)',
        'glow-pink': '0 0 30px rgba(244, 114, 182, 0.35)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.35)',
        'glow-signature': '0 15px 40px -10px rgba(124, 58, 237, 0.3)',
      },
      fontFamily: {
        display: ['"transducer-extended"', '"Syne"', '"Monument Extended"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Open Sans"', '"Inter"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'blob-spin': 'blobSpin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.08)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blobSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
