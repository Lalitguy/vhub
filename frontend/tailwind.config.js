/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'km': ["Kode Mono", "monospace"],
      'mont':["Montserrat", "monospace"],
    },
  },
  plugins: [],
}

