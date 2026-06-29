import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://deployable.sh',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'poimandres' },
  },
  build: { format: 'directory' },
});
