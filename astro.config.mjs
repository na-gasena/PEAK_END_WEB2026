import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://na-gasena.github.io',
  base: '/PEAK_END_WEB2026',
  vite: {
    plugins: [tailwindcss()],
  },
});
