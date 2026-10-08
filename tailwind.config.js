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
        forge: {
          bg: '#08090D',
          surface: '#0E111B',
          card: '#131826',
          'card-hover': '#192033',
          border: '#1F273E',
          'border-light': '#2A3554',
          accent: '#00F0FF',
          'accent-glow': 'rgba(0, 240, 255, 0.25)',
          electric: '#38BDF8',
          neon: '#06B6D4',
          indigo: '#6366F1',
          purple: '#8B5CF6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.12) 0%, rgba(99, 102, 241, 0.06) 40%, transparent 70%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-line': 'glowLine 3s ease-in-out infinite',
      },
      keyframes: {
        glowLine: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 2px #00F0FF)' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 8px #00F0FF)' },
        }
      }
    },
  },
  plugins: [],
}
