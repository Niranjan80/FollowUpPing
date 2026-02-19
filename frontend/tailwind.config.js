module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "bg-gray": "#F8FAFC",
        "text-dark": "#0F172A",
        "text-muted": "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "xl": "18px",
      },
    },
  },
  plugins: [],
}
