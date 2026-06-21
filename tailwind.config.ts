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
        ink: "#05070B",
        navy: "#07111F",
        panel: "#0B1726",
        line: "rgba(125, 220, 255, 0.18)",
        cyan: "#7DDCFF",
        sky: "#4FAFD1",
        teal: "#1E6B87",
        mint: "#B7F8E5"
      },
      boxShadow: {
        glow: "0 0 42px rgba(125, 220, 255, 0.18)"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
