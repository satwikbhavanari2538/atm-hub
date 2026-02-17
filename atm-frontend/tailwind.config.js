/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-primary': '#6366f1',
        'brand-black': '#050505',
      },
    },
  },
  plugins: [],
}
