/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-color": "#F5F5F5",
      },
      margin: {
        "90px": "90px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
