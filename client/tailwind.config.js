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
    },
  },
  plugins: [
    require('tailwindcss-font-inter'),
    require('@tailwindcss/typography'), 
    require('@tailwindcss/forms'), 
  ],
}

