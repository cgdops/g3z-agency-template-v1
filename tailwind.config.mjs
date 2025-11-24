import fs from 'fs';
import path from 'path';

const themePath = path.resolve('./src/data/theme.json');
const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: [theme.fonts.heading, 'serif'],
        body: [theme.fonts.body, 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: theme.borderRadius.DEFAULT,
        lg: theme.borderRadius.lg,
      },
      colors: {
        brand: {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
          accent: theme.colors.accent,
          bg: theme.colors.background,
          surface: theme.colors.surface,
          text: theme.colors.text,
        }
      },
    },
  },
  plugins: [],
};
