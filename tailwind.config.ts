import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef7f0",
          100: "#d9ecdd",
          500: "#2e6f46",
          700: "#184a31",
          900: "#0b2f22"
        },
        navy: {
          800: "#142133",
          900: "#0a1322",
          950: "#070d18"
        },
        gold: {
          100: "#f2e8cc",
          300: "#d6bd74",
          500: "#b08a3c"
        },
        warm: {
          50: "#fbf8f1",
          100: "#f4eee2",
          200: "#e5dbc9"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(10, 19, 34, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
