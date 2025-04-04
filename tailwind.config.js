/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '480px',  // يجب أن يكون خارج كائن extend

    },
    extend: {
      // يمكنك إضافة توسعات أخرى هنا
    },
  },
  plugins: [],
}