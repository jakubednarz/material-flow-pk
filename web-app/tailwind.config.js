import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        "background": "#f7fdff",
        "platinium": "#CCDBDC",
        "lighter_blue": "#9AD1D4",
        "light_blue": "#ecf6fe",
        "celestial": "#36a0fc", 
        "dark_blue": "#003249"
      },
    },
  },
  plugins: [],
}