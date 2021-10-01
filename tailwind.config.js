module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {

      colors: {
        red: {
          450: '#FF5640',
          550: '#FF5050',
          650: '#E00000'
        },
        white: {
          150: '#FFF9F5'
        },
        gray: {
          550: '#2A2A2A',
          450: '#636363'
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
