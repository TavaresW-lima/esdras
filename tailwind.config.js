const plugin = require('tailwindcss/plugin');

module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      plugin(function({ addVariant }) {
        addVariant('nginvalid', '&.ng-invalid')
      })
    ],
};