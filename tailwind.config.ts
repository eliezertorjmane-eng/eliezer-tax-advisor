import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#062033",
        navy: "#0A3148",
        panel: "#FFFFFF",
        line: "#D9EDF6",
        cyan: "#7DDCFF",
        sky: "#4FAFD1",
        teal: "#1E6B87",
        mint: "#E5F8FF",
        soft: "#F4FBFE",
        paper: "#F7FCFF"
      },
      boxShadow: {
        glow: "0 18px 55px rgba(30, 107, 135, 0.14)",
        soft: "0 10px 30px rgba(10, 49, 72, 0.08)"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
