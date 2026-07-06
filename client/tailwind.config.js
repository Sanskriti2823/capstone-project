import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./pages/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
