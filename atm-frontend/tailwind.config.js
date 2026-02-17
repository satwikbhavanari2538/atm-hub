/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#6366f1', // Modern indigo
        'brand-dark': '#0f172a',    // Deep slate
      }
    },
  },
  plugins: [],
}
