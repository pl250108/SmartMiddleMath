/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#CC4B00',
        secondary: '#637381',
        'secondary-main': '#5542BB',
        primary: '#212B36',
        'primary-main': '#FF6315',
        'primary-lighter': '#FFE3D1',
        'warning-main': '#FF9800',
        neutral: '#F4F6F8'
      },
    },
  },
  plugins: [],
}
