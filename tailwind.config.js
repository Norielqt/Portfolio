/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#536942',
          50:  '#f0f4ec',
          100: '#dce8d4',
          200: '#b9d2a9',
          300: '#8fb478',
          400: '#6e9655',
          500: '#536942',
          600: '#44572d',
          700: '#354520',
          800: '#243011',
          900: '#141b09',
        },
      },
    },
  },
  plugins: [],
};