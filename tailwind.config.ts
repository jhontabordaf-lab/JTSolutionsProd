import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563FF",
          50: "#EBF0FF",
          100: "#D6E1FF",
          500: "#2563FF",
          600: "#1A4FCC",
          700: "#1340A6",
        },
        dark: {
          bg: "#08080E",
          card: "#0E0E18",
          "card-2": "#13131F",
          border: "#1C1C2E",
          "border-2": "#252538",
          muted: "#8B8FA8",
          text: "#F0F0F5",
        },
        light: {
          bg: "#FAFAFA",
          card: "#FFFFFF",
          border: "#E5E7EB",
          muted: "#6B7280",
          text: "#0A0A0F",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        "card-lg": "20px",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(37,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.05) 1px, transparent 1px)",
        "grid-pattern-sm":
          "linear-gradient(rgba(37,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-64": "64px 64px",
        "grid-32": "32px 32px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
