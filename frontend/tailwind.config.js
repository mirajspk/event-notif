/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		colors: {
			  primary: '#00A8E5',    //main blue
  		}
  	}
  },
  extend:{
	placeholder: ['responsive', 'focus'],
  },
  plugins: [require("tailwindcss-animate")],
}

