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
        "primary-black-100": "rgb(30,31,34)",
        "primary-dark-900": "rgb(43,45,49)",
        "primary-dark-800": "rgb(181,186,193)",
        "primary-dark-700": "#5E5D5C",
        "primary-white-text": "#F3FCF0",
        "primary-white-100": "rgb(247,247,248)",
        "primary-status-green": "rgb(35,165,90)",
        "primary-status-green-100": "#52AA5E",
        "primary-status-red": "rgb(242,63,67)",
      },
      animation: {  
        "moving-x-axis": "moving-x-axis 1s ease-in-out infinite",
        "animate-appear": "animate-appear 2s ease-in-out forwards",
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
          "from": {
            "opacity": "0",
            "grid-template-rows": "0fr",
            
          },
          "to": {
            "opacity": "1",
            "grid-template-rows": "1fr",
            "background-color": "yellow",
          },
        },
      },
    },
  },
  plugins: [],
};
