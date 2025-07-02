/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js}",
    "./sections/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.js",
    "./plugins/**/*.js",
    "./app.vue",
    "./assets/styles/**/*.css",
  ],
  theme: {
    extend: {
      screens: {
        "s": "360px",
        "xs": "390px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
