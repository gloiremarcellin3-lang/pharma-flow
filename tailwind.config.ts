import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f4fbff",
        ink: "#0f172a",
        brand: {
          50: "#effcff",
          100: "#d4f6fb",
          200: "#a9ebf5",
          400: "#38c7d6",
          500: "#0ea5b7",
          600: "#0891b2",
          700: "#0f766e",
        },
        mint: {
          100: "#dcfce7",
          500: "#22c55e",
          700: "#15803d",
        },
      },
      boxShadow: {
        soft: "0 24px 60px rgba(8, 145, 178, 0.12)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(14, 165, 183, 0.12) 1px, transparent 0)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        display: ["var(--font-space-grotesk)"],
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 500ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;