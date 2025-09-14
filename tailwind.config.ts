// tailwind.config.ts
import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [{ pattern: /^bg-pprimary-/ }, { pattern: /^bg-psecondary-/ }, { pattern: /^bg-psubjects-/ }, { pattern: /^bg-pplaces-/ }, { pattern: /^bg-ppics-/ }],
  theme: {
    extend: {
      colors: {
        pprimary: {
          50: "#f0f7ff",
          100: "#dceeff",
          200: "#a8d3ff",
          300: "#74b8ff",
          400: "#3a98ff",
          500: "#0077ff", // Basisfarbe
          600: "#006ae0",
          700: "#0057b3",
          800: "#004385",
          900: "#003366",
        },
        psecondary: {
          50: "#eef6ff",
          100: "#d7eaff",
          200: "#a6c9ff",
          300: "#75a9ff",
          400: "#3e83ff",
          500: "#0f5eff", // Basisfarbe
          600: "#0d53e0",
          700: "#0b46b3",
          800: "#093985",
          900: "#072d66",
        },
        psubjects: {
          50: "#edf6fc",
          100: "#d3e9f8",
          200: "#a2d0f1",
          300: "#71b6ea",
          400: "#3d9ae3",
          500: "#0080dc", // Basisfarbe
          600: "#0073c5",
          700: "#005fa3",
          800: "#004b80",
          900: "#003b66",
        },
        pplaces: {
          50: "#f0faff",
          100: "#d7f3ff",
          200: "#a6e3ff",
          300: "#75d3ff",
          400: "#3ec0ff",
          500: "#00aeff", // Basisfarbe
          600: "#009be0",
          700: "#0081b3",
          800: "#006785",
          900: "#005266",
        },
        ppics: {
          50: "#f3f8fc",
          100: "#e0eff9",
          200: "#b8dbf1",
          300: "#90c7e9",
          400: "#5aa9df",
          500: "#3d94d6", // Basisfarbe – kühles, gedämpftes Blau
          600: "#3784c0",
          700: "#2e6fa1",
          800: "#245a80",
          900: "#1d4966",
        },
      },
    },
  },

  plugins: [heroui({}), lineClamp],
} satisfies Config;
