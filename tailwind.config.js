module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      },
      borderWidth: {
        '6': '6px'
      },
      width: {
        '80': '20rem',
        '96': '24rem',
        '36vh': '36vh',
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      height: {
        '80': '20rem',
        '96': '24rem',
        '60vh': '60vh',
        '65vh': '65vh',
        '70vh': '70vh',
        '100vh': '100vh',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'stem': ['Stem', 'sans-serif'],
      },
      boxShadow: {
        'tiny': '0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f',
        'button': '3px 3px 3px 0px rgb(0 0 0 / 50%)'
      },
      colors: {
        paletteBlue: {
          default: '#5b78fc',
          'light': '#f2f2ff',
          'dark': '#d8d9f7',
        }
      },
      inset: {
        '1-': '-0.25rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '10-': '-2.5rem',
        '20-': '-5rem',
        '40-': '-10rem',
      }
    },
  },
  variants: {},
  plugins: [],
}
