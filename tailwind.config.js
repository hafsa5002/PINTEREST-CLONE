/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs",       // EJS templates
    "./public/**/*.js",       // frontend JS files (optional)
    "./src/**/*.{html,js}"  ], // if you have HTML or JS in src"
  theme: {
    extend: {},
  },
  plugins: [],
}

