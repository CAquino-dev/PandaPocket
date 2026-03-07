import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all your React components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#347571",          // your main finance green
        secondary: "#5DBB8A",        // lighter complementary green
        accent: "#F2D96B",           // yellow accent
        sidebar: "#2E2A4F",          // sidebar background
        "sidebar-foreground": "#ffffff",
        "sidebar-border": "#4A4A6B",
        background: "#F5F5F5",       // main page background
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        "sidebar-width": "16rem",
        "sidebar-width-mobile": "18rem",
        "sidebar-width-icon": "3rem",
      },
    },
  },
  plugins: [],
};

export default config;