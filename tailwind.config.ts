import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F1",
        "cream-deep": "#F4E8D8",
        sunny: "#F6DFA5",
        tangerine: "#E7A77C",
        punch: "#D98278",
        bubble: "#E8A8B8",
        lime: "#BFD8B8",
        grape: "#75627F",
        ink: "#302824",
        sky: "#B8D9E5",
        forest: "#668A70",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        hero: ["var(--font-hero)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        sticker: "0 4px 14px rgba(76,57,47,0.10)",
        pop: "0 12px 30px rgba(76,57,47,0.12)",
        chonk: "0 18px 48px rgba(76,57,47,0.14)",
        "pop-sunny": "0 8px 22px rgba(188,145,72,0.20)",
        "pop-bubble": "0 8px 22px rgba(190,112,135,0.18)",
      },
      borderRadius: {
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        wobble: {
          "0%,100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        spinslow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 34s linear infinite",
        wobble: "wobble 2.4s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
        spinslow: "spinslow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
