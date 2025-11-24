import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Add Tailwind support
  integrations: [
    tailwind(),
    sitemap()
  ],

  // vital for GitHub Pages hosting
  site: 'https://cgdops.github.io',
  base: '/g3z-agency-template-v1', 
});
