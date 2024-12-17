import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    // "./app/**/*/{js, ts,jsx,tsx}",
    // "./components/**/*.{js,ts,jsx,tsx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff", // 라이트 모드 배경색
          dark: "#1a202c", // 다크 모드 배경색
        },

        foreground: {
          DEFAULT: "#000000", // 라이트 모드 글자색
          dark: "#f7fafc", // 다크 모드 글자색
        },
        lolGold: "rgb(200, 170, 110)",
      },
    },
  },
  plugins: [],
};
export default config;
