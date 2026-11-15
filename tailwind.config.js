/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        tech: ['"Rajdhani"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        obsidian: '#07090d',
        forge: '#111622',
        steel: '#8b9bb4',
        amberRune: '#f59e0b',
        cyanArc: '#06b6d4',
      }
    },
  },
  plugins: [],
};
