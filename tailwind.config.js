module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        
      },
      boxShadow: {
         
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      mdlg: "1000px",
      // => @media (min-width: 768px) { ... }

      lg: "1580px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      xs: ".73rem",
      sm: ".85rem",
      tiny: ".83rem",
      base: ".90rem",
      lg: "1.0rem",
      xl: "1.11rem",
      "2xl": "1.2rem",
      "3xl": "1.5rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
  ],
};
