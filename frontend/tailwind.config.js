/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apex: {
          red: '#FF4E1D',
          dark: '#161616',
          gray: '#233038',
          light: '#FFFFFF',
          accent: '#C4D95C', // Light Green/Yellow for some elements
        }
      },
      fontFamily: {
        apex: ['Teko', 'sans-serif'],
      },
      clipPath: {
        'slanted-right': 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
        'slanted-left': 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
        'apex-card': 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
      }
    },
  },
  plugins: [],
}
