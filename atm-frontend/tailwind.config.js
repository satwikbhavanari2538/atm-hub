/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-primary': '#6366f1', // Modern indigo
        'brand-black': '#050505',
        'slate-950': '#0a0a0a',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(145deg, #000000, #111111)',
      }
    },
  },
  plugins: [],
}
