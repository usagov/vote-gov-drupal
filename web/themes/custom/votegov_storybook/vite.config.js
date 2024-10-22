import { defineConfig } from "vite";
import yml from '@modyfi/vite-plugin-yaml';
import { join } from "node:path";
import twig from "vite-plugin-twig-drupal";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["./node_modules/@uswds/uswds/packages"],
      },
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
        uswds: join(__dirname, "./node_modules/@uswds/uswds/dist"),
        project: join(__dirname, "./components/project"),
        uswds: join(__dirname, "./components/uswds"),
        bixal: join(__dirname, "./components/bixal"),
      },
    }),
    // Allows Storybook to read data from YAML files.
    yml(),
  ],
  framework: "html",
});
