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
        "background": "#f0f5f5",
        "platinium": "#CCDBDC",
        "lighter_blue": "#9AD1D4",
        "light_blue": "#80CED7",
        "celestial": "#36a0fc", 
        "dark_blue": "#003249"
      },
    },
  },
  plugins: [],
}