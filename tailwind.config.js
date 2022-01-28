module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fill: theme => ({
      'red': theme('colors.red.450'),
      'green': theme('colors.green.500'),
      'blue': theme('colors.blue.500'),
    }),
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
       '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration
       'footer': '200px minmax(900px, 1fr) 100px',
      },
      gridTemplateRows: {
        // Simple 8 row grid
       '8': 'repeat(8, minmax(0, 1fr))',

        // Complex site-specific row configuration
       'layout': '1fr 1fr 100px',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        bounce2: 'bounce2 1s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounce2: {
          '0%, 100%': { transform: 'translateY(-15%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
      height: {
        '10vh': '10vh',
        '30vh': '30vh',
        '7vh': '7vh',
        '80vh': '80vh',
        '25%': '25%',
        '60%': '60%',
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '1px': '1px',
        '15px': '15px',
        '25px': '25px',
        '30px': '30px',
        '40px': '40px',
        '25px': '25px',
        '80px': '80px',
        '100px': '100px',
        '300px': '300px',
      },
      width: {
        '1px': '1px',
        '2vw': '2vw',
        '10vw': '10vw',
        '30vw': '30vw',
        '80vw': '80vw',
        '92vw': '92vw',
        '95vw': '95vw',
        '95%': '95%',
        '100vw': '100vw',
        '100px': '100px',
        '600px': '600px',
      },
      colors: {
        red: {
          450: '#FF5640',
          550: '#FF5050',
          650: '#E00000'
        },
        white: {
          150: '#FFF9F5',
          0: '#FFFFFF'
        },
        gray: {
          550: '#2A2A2A',
          450: '#636363',
          650: '#777777',
        },
      },
    },
    boxShadow: {
      custom: '0px -3px 10px 1px rgba(0, 0, 0, 0.1)'
    }
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    extend: {
      backgroundColor: ['active', 'checked'],
      display: ['dark'],
      borderColor: ['checked'],
      animation: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/forms')({
    strategy: 'class',
  })],
}
