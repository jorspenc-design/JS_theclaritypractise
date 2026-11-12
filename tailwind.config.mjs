/** @type {import('tailwindcss').Config} */
// Brand palette from the Joshua Spence Visual Identity Guide, version 2.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        slate:       '#2B4C6F', // Deep Slate: headlines, primary buttons, the arch
        'slate-deep':'#223D5A', // hover state for Deep Slate
        charcoal:    '#2B2B2B', // body text
        ink:         '#2B2B2B', // alias for body text
        ivory:       '#F7F3ED', // default canvas
        paper:       '#FBF9F5', // lifted surface, used where white would be
        stone:       '#D9D2C5', // section backgrounds, cards, dividers
        brass:       '#B08D57', // keystone, rules, accents
        'brass-ink': '#8A6A3B', // brass for small text on light backgrounds (meets contrast)
        clay:        '#B5654A', // warmth, used sparingly
        'warm-grey': '#6B6660', // captions, metadata
        olive:       '#3A3D2E', // footer and deep backgrounds
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '680px',
      },
    },
  },
  plugins: [],
};
