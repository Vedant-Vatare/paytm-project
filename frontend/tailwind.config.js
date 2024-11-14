/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'opensans': ['"Open Sans"', 'sans-serif'],
      'Inter': ["Inter", 'sans-serif'],
      'poppins': [ "Poppins", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}

