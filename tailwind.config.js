/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep mystical space canvas
        midnight: {
          DEFAULT: '#0B0F19',
          900: '#0B0F19',
          800: '#0E1322',
          700: '#161C2D',
          600: '#1E2740',
        },
        // Panel / surface tones
        surface: {
          DEFAULT: '#121829',
          raised: '#1A2138',
          border: '#2A3354',
        },
        // Shimmering gold accents
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F0D67E',
          dark: '#A8862B',
          glow: '#FFE9A8',
        },
        nebula: {
          violet: '#8B7BD8',
          indigo: '#5B4B9E',
          teal: '#5BD8C8',
          rose: '#D87B9E',
        },
      },
      fontFamily: {
        // Latin luxury serif for brand headers; Thai serif fallback
        display: ['Cinzel', 'Noto Serif Thai', 'serif'],
        serif: ['"Cormorant Garamond"', 'Noto Serif Thai', 'serif'],
        // Clean sans for body + Thai
        sans: ['Inter', 'Noto Sans Thai', 'system-ui', 'sans-serif'],
        thai: ['Noto Sans Thai', 'sans-serif'],
        // Numbers / scores
        score: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.35em',
      },
      boxShadow: {
        gold: '0 0 20px -2px rgba(212, 175, 55, 0.45)',
        'gold-lg': '0 0 40px -4px rgba(212, 175, 55, 0.55)',
        panel: '0 8px 40px -12px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'space-radial':
          'radial-gradient(ellipse at 50% 35%, #1a2340 0%, #0d1220 45%, #070a12 100%)',
        'gold-sheen':
          'linear-gradient(135deg, #F0D67E 0%, #D4AF37 45%, #A8862B 100%)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 18px -4px rgba(212,175,55,0.45)' },
          '50%': { boxShadow: '0 0 34px 2px rgba(212,175,55,0.7)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
