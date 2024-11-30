/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      opensans: ['"Open Sans"', "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-brand-color": "hsl(239, 84%, 64%)",
        "primary-white-text": "hsl(105, 67%, 96%)",
        "primary-white-100": "hsl(240, 7%, 97%)",
        "primary-dark-700": "hsl(0, 0%, 30%)",
        "primary-dark-800": "hsl(0, 0%, 20%)",
        "primary-dark-900": "hsl(220, 7%, 17%)",
        "primary-black-100": "hsl(0, 0%, 11%)",
        "primary-status-green-100": "hsl(128, 35%, 49%)",
        "primary-status-green": "hsl(145, 65%, 39%)",
        "primary-status-red": "hsl(359, 87%, 60%)",
        "dark-gradient-900":
          "to bottom right hsl(220, 7%,13%) hsl(225, 6%, 10%))",
      },
      animation: {
        "moving-x-axis": "moving-x-axis 1s ease-in-out infinite",
        "animate-appear": "animate-appear 250ms ease-out forwards",
        "fade-down": "fade-down 250ms ease-in-out forwards",
      },
      keyframes: {
        "moving-x-axis": {
          "0%": {
            width: "0",
            left: "0",
          },
          "50%": {
            width: "100%",
          },
          "100%": {
            width: "0",
            left: "unset",
            right: "0",
          },
        },

        "animate-appear": {
          "0%": {
            opacity: "0",
            scale: "1 0",
          },
          "100%": {
            opacity: "1",
            scale: "1 1",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.75)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
