// @ts-check
import { defineConfig, envField } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' }), // Use custom image service
  env: {
    schema: {
      GITHUB_REPO: envField.string({ context: 'client', access: 'public' }),
      CLOUDFLARE_DASH: envField.string({ context: 'client', access: 'public' }),
      NEW_AKSELL_TOOL: envField.string({ context: 'client', access: 'public' }),
      EDIT_HTML: envField.string({ context: 'client', access: 'public' }),
      EDIT_LINKS: envField.string({ context: 'client', access: 'public' }),
      EDIT_MARKDOWN: envField.string({ context: 'client', access: 'public' }),
      EDIT_PENS: envField.string({ context: 'client', access: 'public' }),
      API_SECRET: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
