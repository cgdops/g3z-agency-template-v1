import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Add Tailwind support
  integrations: [tailwind()],

  // vital for GitHub Pages hosting
  site: 'https://github.com',
  base: '/g3z-agency-template-v1', 
});
