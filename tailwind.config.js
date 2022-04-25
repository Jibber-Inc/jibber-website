const twColors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        jibber: '#9A6FFF',
        'jibber-bg': '#151515'
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
}
