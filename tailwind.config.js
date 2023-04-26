/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        "2xl": "1440px",
      },
      colors: {
        primary: "#279574",
        secondary: "#1E1E1E",
        tertiary: "#D0D0D0",
      },
      fontFamily: {
        manrope: ["'Manrope'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
