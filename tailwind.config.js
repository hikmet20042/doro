/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: "Verdana",
        logo: "Caveat Brush",
        mono: "Space Mono",
      },
      colors: {
        main: "#FF6B6B",
        secondTheme: "#6b70ff",
        thirdTheme: "#ffaf6b",
        fourthTheme: "#6b9bff",
      },
    },
  },
  plugins: [],
};
