import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "surface-warm-white": "#F5F0EA",
        "surface-off-white": "#EDEAE4",
        "ink-primary": "#1A1A1A",
        "text-muted": "#5A5450",
        "surface-clay-mid": "#8B7B6A",
        "accent-linocut-red": "#C9622F",
        "accent-deep-blue": "#1E3A5F",
        "accent-ochre": "#E8C87A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        caveat: ["var(--font-caveat)", "cursive"],
      },
      maxWidth: {
        "8xl": "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
