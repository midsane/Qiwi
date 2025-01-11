/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        mred: "#FF5F57",
        mblue: "#00A2FF",
        myellow: "#FFBF2F",
        mgreen: "#76CA3E",
        mwhite: "#FEFDFD",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
