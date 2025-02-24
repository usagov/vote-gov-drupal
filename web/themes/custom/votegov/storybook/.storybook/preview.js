import Twig from 'twig';
// https://github.com/JohnAlbin/drupal-twig-extensions
import { addDrupalExtensions } from 'drupal-twig-extensions/twig';

// Import custom stylesheet for StorybookJS.
import "../../dist/css/styles.css";

addDrupalExtensions(Twig, {
  // Optionally, set options to configure how the Drupal
  // extensions should behave. See "Options" below for
  // details.
});

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    options: {
      showPanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  }
};

export default preview;
