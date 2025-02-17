// tailwind.config.ts
import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

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
        primary: "#84a98c",
        pprimary: {
          50: "#f5f8f6",
          100: "#ebf1ed",
          200: "#cde0d2",
          300: "#afcfb7",
          400: "#74ad81",
          500: "#84a98c", // Basisfarbe
          600: "#779882",
          700: "#637e6d",
          800: "#4f6558",
          900: "#405249",
        },
        psecondary: {
          50: "#f5f6f8",
          100: "#ebedf1",
          200: "#ccd2dd",
          300: "#adb7c9",
          400: "#7081a1",
          500: "#819ebc", // Basisfarbe
          600: "#748ea9",
          700: "#61768d",
          800: "#4e5e71",
          900: "#404e5c",
        },
        psubjects: {
          50: "#f3f2f4",
          100: "#e7e5e9",
          200: "#c4bfca",
          300: "#a199ab",
          400: "#5b4d6d",
          500: "#5d4c5e", // Basisfarbe
          600: "#544454",
          700: "#473944",
          800: "#3a2e35",
          900: "#2f252b",
        },
        pplaces: {
          50: "#f9f6f6",
          100: "#f3edec",
          200: "#e0d1d0",
          300: "#cdb5b3",
          400: "#a77d7a",
          500: "#b38484", // Basisfarbe
          600: "#a27777",
          700: "#876360",
          800: "#6b4f4d",
          900: "#573f3e",
        },
        ppics: {
          50: "#fdf6f3",
          100: "#fbe9e0",
          200: "#f6cdb8",
          300: "#f1b090",
          400: "#e7825a",
          500: "#db6b3d", // Basisfarbe – kühles, gedämpftes Orange
          600: "#c45f37",
          700: "#a14f2e",
          800: "#7f3f24",
          900: "#66321d",
        },
      },
    },
  },
  plugins: [heroui({})],
} satisfies Config;
