module.exports = {
  daisyui: {
    themes: ["light"], // فقط نمط الضوء بدون الوضع الداكن
  },
  purge: [],
  darkMode: "false", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: "480px", // نقطة توقف جديدة عند 480px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
