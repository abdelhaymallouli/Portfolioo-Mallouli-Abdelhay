import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // This must be here for the toggle to work
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#6366f1", // Indigo
      },
    },
  },
  plugins: [],
};
export default config;