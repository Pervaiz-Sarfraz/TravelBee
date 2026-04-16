/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50:  'hsl(205, 75%, 95%)',
          100: 'hsl(205, 75%, 88%)',
          200: 'hsl(205, 70%, 75%)',
          300: 'hsl(205, 68%, 60%)',
          400: 'hsl(200, 65%, 48%)',
          500: 'hsl(200, 72%, 38%)',
          600: 'hsl(205, 75%, 28%)',
          700: 'hsl(210, 78%, 20%)',
          800: 'hsl(215, 80%, 14%)',
          900: 'hsl(220, 85%, 9%)',
        },
        wave:    'hsl(190, 65%, 42%)',
        seafoam: 'hsl(175, 50%, 62%)',
        sand:    'hsl(38, 45%, 94%)',
        coral:   'hsl(15, 80%, 60%)',
        dark:    'hsl(215, 40%, 10%)',
        gold:    'hsl(42, 90%, 60%)',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ocean-gradient':  'linear-gradient(135deg, hsl(215,80%,14%) 0%, hsl(200,72%,28%) 100%)',
        'hero-overlay':    'linear-gradient(to bottom, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.65) 100%)',
        'shimmer-gradient':'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
        'glow-radial':     'radial-gradient(circle at center, hsl(190,65%,42%,0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-wave':   '0 0 30px rgba(100, 210, 200, 0.3)',
        'glow-ocean':  '0 0 40px rgba(40, 100, 180, 0.25)',
        'card-hover':  '0 20px 60px rgba(10, 22, 40, 0.15)',
        'glass':       '0 8px 32px rgba(10, 22, 40, 0.12)',
        'xl-soft':     '0 25px 50px -12px rgba(10, 22, 40, 0.2)',
      },
      animation: {
        'fade-up':     'fadeUp 0.6s ease forwards',
        'fade-in':     'fadeIn 0.4s ease forwards',
        'shimmer':     'shimmer 2.2s infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'glow-pulse':  'glowPulse 2.5s ease-in-out infinite',
        'slide-up':    'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down':  'slideDown 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(100,210,200,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(100,210,200,0.5)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
