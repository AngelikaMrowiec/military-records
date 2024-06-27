/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gravelgray: {
          DEFAULT: "#545853",
          100: "#4b4f4a",
          200: "#434642",
          300: "#3a3d3a",
          400: "#323431",
          500: "#2a2c29",
        },
        timberwolf: {
          DEFAULT: "#dad7cd",
          100: "#312e24",
          200: "#615b48",
          300: "#92896c",
          400: "#b6b09c",
          500: "#dad7cd",
          600: "#e2dfd7",
          700: "#e9e7e1",
          800: "#f0efeb",
          900: "#f8f7f5",
        },
        sage: {
          DEFAULT: "#a3b18a",
          100: "#212619",
          200: "#434c33",
          300: "#64724c",
          400: "#859865",
          500: "#a3b18a",
          600: "#b6c1a2",
          700: "#c8d0b9",
          800: "#dae0d0",
          900: "#edefe8",
        },
      },
    },
  },
  plugins: [],
};
