/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: { DEFAULT: "#030303", 50: "#080808", 100: "#0e0e10", 200: "#141417" },
        surface: "#0e0e10",
        stroke: { DEFAULT: "rgba(255,255,255,0.08)", hover: "rgba(255,255,255,0.16)", strong: "rgba(255,255,255,0.24)" },
        accent: { DEFAULT: "#10b981", soft: "#34d399", cyan: "#22d3ee", muted: "#0f6a52" },
      },
      fontFamily: {
        sans: ['"Geist"', "system-ui", "sans-serif"],
        display: ['"Geist"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 20px 60px -30px rgba(0,0,0,0.9)",
        aura: "0 0 0 1px rgba(16,185,129,0.25), 0 0 40px -8px rgba(16,185,129,0.45)",
        "aura-lg": "0 0 0 1px rgba(16,185,129,0.3), 0 0 90px -20px rgba(16,185,129,0.55)",
        float: "0 40px 100px -30px rgba(0,0,0,1)",
      },
      backgroundImage: {
        specular: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 60%, rgba(16,185,129,0.18) 100%)",
        noise: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")",
        "text-shimmer": "linear-gradient(110deg, #f4f4f5 0%, #f4f4f5 35%, #a7f3d0 48%, #67e8f9 52%, #f4f4f5 65%, #f4f4f5 100%)",
        "hero-gradient": "linear-gradient(180deg, #fafafa 0%, #d4d4d8 55%, #71717a 100%)",
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        aurora: {
          "0%, 100%": { transform: "translate3d(-8%, -6%, 0) scale(1)" },
          "50%": { transform: "translate3d(8%, 6%, 0) scale(1.08)" },
        },
        radar: { "0%": { transform: "scale(0.6)", opacity: "0.7" }, "100%": { transform: "scale(2.2)", opacity: "0" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        voice: { "0%, 100%": { height: "4px" }, "50%": { height: "16px" } },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        radar: "radar 2.4s cubic-bezier(0.2,0.6,0.2,1) infinite",
        "fade-up": "fade-up 500ms cubic-bezier(0.2,0.8,0.2,1) both",
        voice: "voice 900ms ease-in-out infinite",
      },
      transitionTimingFunction: { spring: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      transitionDuration: { 400: "400ms" },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};
