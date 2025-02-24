import { defineConfig, searchForWorkspaceRoot } from "vite";
import yml from '@modyfi/vite-plugin-yaml';
import { join } from "node:path";
import twig from "vite-plugin-twig-drupal";

export default defineConfig({
  server: {
    fs: {
      strict: false,
      allow: ['..'],
    },
  },
  plugins: [
    twig({
      /**
       * Allows namespaces in twig templates.
       * @example
       * {% include "@components/blurb/blurb.html.twig" with blurb %}
       */
      namespaces: {
        components: join(__dirname, "./stories/"),
      },
    }),
    // Allows Storybook to read data from YAML files.
    yml(),
  ],
  framework: "html",
  build: {
    rollupOptions: {
      input: {
        index: join(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
});
