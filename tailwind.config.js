/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7E3EFF',
        'primary-light': '#9D6BFF',
        'primary-dark': '#6026CC',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        dark: {
          900: '#121212',
          800: '#1E1E1E',
          700: '#2D2D2D',
          600: '#383838',
          500: '#4F4F4F',
          400: '#666666',
          300: '#808080',
          200: '#9E9E9E',
          100: '#BDBDBD',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      maxWidth: {
        'container': '1280px',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
};