/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', 'ui-sans-serif', 'system-ui'],
        display: ['"Noto Sans KR"', 'sans-serif'],
      },
      colors: {
        primary: '#1F2A44',
        secondary: '#3B82F6',
        background: '#F9FAFB',
        text: '#1A1A1A',
        disabled: '#B1B5B9',
        dark: '#221313',

        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
};
