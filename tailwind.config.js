/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#111111',
        'bg-tertiary': '#1a1a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#888888',
        'text-muted': '#555555',
        'accent': '#6366f1',
        'accent-hover': '#818cf8',
        'accent-2': '#a855f7',
        'accent-3': '#ec4899',
        'accent-4': '#06b6d4',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        serif: ['Playfair Display', 'serif'],
        clean: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
        'gradient-2': 'linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1)',
        'gradient-3': 'linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)',
        'gradient-text': 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)',
      },
      animation: {
        'pulse-logo': 'pulse-logo 2s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'blink': 'blink 2s ease-in-out infinite',
        'glitch-1': 'glitch-anim 3s infinite linear alternate-reverse',
        'glitch-2': 'glitch-anim2 2s infinite linear alternate-reverse',
      },
      keyframes: {
        'pulse-logo': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.7' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
