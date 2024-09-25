import { defineConfig } from "vite";
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
        components: join(__dirname, "./stories/components"),
        pages: join(__dirname, "./stories/pages"),
        partials: join(__dirname, "./stories/partials"),
      },
    }),
  ],
  framework: "html",
});
