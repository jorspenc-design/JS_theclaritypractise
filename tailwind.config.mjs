/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory:     '#F7F4EE',
        charcoal:  '#1C1917',
        slate:     '#57534E',
        brass:     '#A07840',
        clay:      '#96543F',
        'warm-grey': '#78716C',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
