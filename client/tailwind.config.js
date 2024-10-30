/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
      },
      colors: {
        customStone: "rgb(120, 113, 108)",
      },
      fontFamily: {
        // Add Inter font family to your Tailwind theme
        sans: ["Inter", "sans-serif"],
      },
      margin: {
        "154px": "154px",
        "100px": "100px",
      },
      minHeight: {
        "100vh": "100vh",
      },
      screens: {
        searchBar_invert: "640px", // Custom breakpoint starting at 640px
        between_ipad_laptop: "840px", // Custom breakpoint starting at 840px
        "between_ipad_laptop-max": { max: "1023px" }, // Custom breakpoint ending at 1023px
        laptop: "1024px", // Custom breakpoint starting at 1024px
      },
    },
  },
  plugins: [
    require("tailwindcss-font-inter"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
