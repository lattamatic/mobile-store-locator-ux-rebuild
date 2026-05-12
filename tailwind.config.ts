import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#191512",
        blush: "#F8E8E7",
        pearl: "#FFF9F5",
        rosewood: "#8F4A5A",
        sage: "#71806A",
        champagne: "#E9D8BE"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(45, 31, 26, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
