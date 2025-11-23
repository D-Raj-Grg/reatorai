import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Theme colors and variables are defined in globals.css @theme block
      // This allows Tailwind CSS 4's new @theme syntax to work properly
    },
  },
  plugins: [],
} satisfies Config
