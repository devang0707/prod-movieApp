/** @type {import('tailwindcss').Config} */

// add "./{folderName}/**/*.{js,jsx,ts,tsx}" to apply tailwind access to folder "folderName"

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}" , "./components/**/*.{js,jsx,ts,tsx}" , "./navigation/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

