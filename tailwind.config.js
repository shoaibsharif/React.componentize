module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
