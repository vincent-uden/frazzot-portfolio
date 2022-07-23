/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
          fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
          }
      },
      animation: {
        fadein: 'fadein 1s'
      },
      backgroundImage: {
          'holo': "url('/img/holographic_background.png')",
      },
      boxShadow: {
        'hard-xl-red': '0 5px 0 0 rgb(127, 29, 29)',
        'hard-xl-white': '0 5px 0 0 rgb(29, 29, 29)',
      },
      fontFamily: {
        'stretch': ['StretchPro'],
      },
      colors: {
        'greyblack': "#292a2c",
        'mint': "#94edd5",
        'sky': "#94ceed",
        'periwinkle': "#949aed",
        'lilac': "#ceb3ea",
        'pastelpink': "#eab3c5",
        'yellowpeach': "#ead0b3",
      },
    },
  },
  plugins: [],
};
