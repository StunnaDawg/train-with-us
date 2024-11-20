/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#1b1d1f",
          700: "#393c3f",
          300: "#54575b",
        },
      },
    },
  },
  plugins: [],
}
