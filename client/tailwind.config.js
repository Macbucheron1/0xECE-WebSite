/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add Inter font family to your Tailwind theme
        sans: ['Inter', 'sans-serif'],
      },
      margin: {
        '5p': '5%',
        '170px': '170px',
        '120px': '120px',
        '110px': '110px',
        '108px': '108px',
        '5vh': '5vh',
        '10vh': '10vh',
        '11vh': '11vh',
        '16vh': '16vh',
        '20vh': '23vh',
      },
    },
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require('@tailwindcss/typography'), 
    require('@tailwindcss/forms'), 
  ],
}

