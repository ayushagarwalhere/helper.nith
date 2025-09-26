/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry: ['zentry', 'sans-serif'],
        general: ['general', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
        'robert-med': ['robert-med', 'sans-serif'],
        'robert-reg': ['robert-reg', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#BECAD3',
          100: '#0e213a',
          150: '#0F3460',
          200: '#100418',
        },
        pink: {
          50: '#FFE4E1',
          100: '#EAB8B8',
          150: '#EFC7C3',
          200: '#F9AFAF',
          300: '#E89292',
        },


      },
    },
  },
  plugins: [],
}

