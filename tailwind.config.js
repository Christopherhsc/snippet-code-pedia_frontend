/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        xs: '350px'
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(20px)'
      }
    }
  },
  plugins: []
}
