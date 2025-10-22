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
        background: {
          basic: '#EDEDED',
          gray: '#F3F4F5',
          darkgray: '#3D3D3D',
        },
        title: '#3D3D3D',
        text: '#1A1A1A',
        desc: '#525252',
        disabled: '#B1B5B9',
        dark: '#221313',
        placeholder: '#606265',

        white: '#FFFFFF',
        black: '#000000',
        gray: {
          1: '#E0E5EA',
          2: '#696969',
        },
        // red: '#FF3737',
      },
      boxShadow: {
        inner: 'inset 0 0 0 1px none',
      },
    },
  },
  plugins: [],
};
