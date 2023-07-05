/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 3px 12px 0 rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        yellowfade: {
          'from': { background: "yellow" },
          'to': { background: "transparent" },
        }
      },
      animation: {
        flashMessage: 'yellowfade 3s ease-in-out',
      }
    },
  },
  plugins: [],
}

