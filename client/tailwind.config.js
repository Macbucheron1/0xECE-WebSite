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
        sans: ["Inter", "sans-serif"],
      },
      margin: {
        "5p": "5%",
        "193px": "193px",
        "156px": "156px",
        "124px": "124px",
        "144px": "144px",
        "custompx": "156px",

        "5vh": "5vh",
        "10vh": "10vh",
        "11vh": "11vh",
        "16vh": "16vh",
        "20vh": "23vh",
      },
      minHeight: {
        "100vh": "100vh",
      },
      screens: {
        "between_ipad_laptop": "840px", // Custom breakpoint starting at 840px
        "between_ipad_laptop-max": { max: "1023px" }, // Custom breakpoint ending at 1023px
        "laptop": "1024px", // Custom breakpoint starting at 1024px
      },
    },
  },
  plugins: [
    require("tailwindcss-font-inter"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

