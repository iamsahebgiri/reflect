import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--bg), <alpha-value>)",
        surface: "rgba(var(--surface), <alpha-value>)",
        title: "rgba(var(--text), <alpha-value>)",
        subtitle: "rgba(var(--subtitle), <alpha-value>)",
        border: "rgba(var(--border), <alpha-value>)",
        hover: "rgba(var(--hover), <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--inter-font)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
