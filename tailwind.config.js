module.exports = {
  purge: ['./src/**/*.svelte', './public/**/*.html'], // Ensures unused CSS is purged from Svelte/HTML files
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // Customize your theme here if necessary
      colors: {
        primary: '#5cb85c',
        secondary: '#f4f4f4',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};