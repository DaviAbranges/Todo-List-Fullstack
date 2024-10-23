//tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#F3F4F6",
        fontColor: "#6a1b9a",
        secondColor: "#8428e3",
        thirdColor: "#8a2ae3",
        dark: {
          background: "#1B1F38",
          fontColor: "#E0E0E0",
          secondColor: "#232D4B",
          bgSlate: "#334155",
        },
      },
    },
  },
  plugins: [],
};
export default config;
