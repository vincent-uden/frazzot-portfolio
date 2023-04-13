/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadein: "fadein 1s",
        "fadein-fast": "fadein .2s",
      },
      backgroundImage: {
        holo: "url('/img/holographic_background.webp')",
        "pattern-holo": "url('/img/pattern_holographic_faded_edge.webp')",
        "pattern-holo-short":
          "url('/img/pattern_holographic_faded_edge_short.webp')",
        "pattern-holo-inv":
          "url('/img/pattern_holographic_faded_edge_upside_down.webp')",
        "pattern-holo-short-inv":
          "url('/img/pattern_holographic_faded_edge_upside_down_short.webp')",
      },
      boxShadow: {
        "hard-xl-red": "0 5px 0 0 rgb(127, 29, 29)",
        "hard-xl-white": "0 5px 0 0 rgb(29, 29, 29)",
        left: "-5px 0px 20px -5px #00000099",
        "panel": "0px 0px 29px 0px rgba(0, 0, 0, 0.3);",
        "blog-panel": "0px 0px 29px 0px rgba(0, 0, 0, 0.5);"
      },
      fontFamily: {
        stretch: ["StretchPro"],
        neou: ["Neou-Thin"],
        "neou-bold": ["Neou-Bold"],
        cocogoose: ["Cocogoose"],
        gothic: ["Century Gothic"],
      },
      gridRow: {
        "span-7": "span 7 / span 7",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
      colors: {
        greyblack: "#292a2c",
        mint: "#94edd5",
        sky: "#94ceed",
        periwinkle: "#949aed",
        lilac: "#ceb3ea",
        pastelpink: "#eab3c5",
        yellowpeach: "#ead0b3",
        "periwinkle-light": "#B3B8F9",
      },
    },
  },
  plugins: [],
};
