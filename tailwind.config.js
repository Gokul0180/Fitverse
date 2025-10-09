/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2563eb", // blue-600
        secondary: "#7c3aed", // purple-600
        dark: "#0f172a", // slate-900
      },
      backgroundImage: {
        'gradient-glow': 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))',
      },
      boxShadow: {
        glow: "0 0 20px rgba(56,189,248,0.5)",
      },
      transitionProperty: {
        'all': 'all',
      },
    },
  },
  plugins: [],
};
