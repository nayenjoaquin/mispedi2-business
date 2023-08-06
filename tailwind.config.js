/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        'nav': '80px',
      },
      colors: {
        main: {
          '50': '#62f9c7',
          '100': '#4fdeaf',
          '200': '#3cc396',
          '300': '#2aa87e',
          '400': '#178d65',
          '500': '#04724d',
          '600': '#03563a',
          '700': '#023927',
          '800': '#011d13',
          '900': '#000000',
        },
        secondary: {
          '50': '#ffffff',
          '100': '#fee8d3',
          '200': '#fdd1a7',
          '300': '#fdb97c',
          '400': '#fca250',
          '500': '#fb8b24',
          '600': '#d7751c',
          '700': '#b36013',
          '800': '#8f4a0b',
          '900': '#6b3402',
        },
        
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
