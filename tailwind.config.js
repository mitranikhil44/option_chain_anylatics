/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        translate_down_to_up:{
          '0%': {transform: 'translateY(100vh)', opacity: '0'},
          "100%": {transform: 'translateY(00px)', opacity: '1'}
        },
        translate_up_to_down:{
          "0%": {transform: 'translateY(-30vh)', opacity: '0'},
          '100%': {transform: 'translateY(0vh)', opacity: '1'}
        },
        translate_right_to_left:{
          "0%": {transform: 'translateX(100vw)', opacity: '0'},
          '100%': {transform: 'translateX(0vw)', opacity: '1'}
        }
      },
      animation:{
        translate_down_to_up: "translate_down_to_up 1s ease-in-out",
        translate_up_to_down: "translate_up_to_down 1s ease-in-out",
        translate_right_to_left: "translate_right_to_left 1s ease-in-out"
      },
      screens:{
        "xs": "475px",
        "xxs": "375px"
      },
    },
  },
  plugins: [],
}
