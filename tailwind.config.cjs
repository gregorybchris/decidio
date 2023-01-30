/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121214",
      },
    },
    fontFamily: {
      poppins: "Poppins",
      sen: "Sen",
    },
  },
  plugins: [],
};
