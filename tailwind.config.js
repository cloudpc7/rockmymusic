/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        rmm: {
          navy: "#04203c",
          cyan: "#00ffff",
          glow: "#00e5ff",
          ink: "#0d0d0d",
          muted: "#9aa0a6",
          white: "#ffffff",
          transparent: "transparent",
          vinyl: "hsl(210, 8%, 11%)",
        },
      },
      spacing: {
        title: "48px",
        form: "36px",
        figure: "24px",
        control: "64px",
      },
      width: {
        form: "300px",
        title: "92%",
      },
      height: {
        figure: "48%",
        control: "64px",
      },
      borderRadius: {
        input: "12px",
        btn: "4px",
      },
      fontFamily: {
        futura: ["Futura-Bold"],
      },
      fontSize: {
        title: ["40px", { lineHeight: "44px", letterSpacing: "1.5px" }],
      },
      aspectRatio: {
        title: "723 / 170",
      },
      zIndex: {
        intro: "20",
        chrome: "10",
      },
    },
  },
  plugins: [],
};
