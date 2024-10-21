// USWDS JS for interactive components.
import "@uswds/uswds";
import Twig from 'twig';
// https://github.com/JohnAlbin/drupal-twig-extensions
import { addDrupalExtensions } from 'drupal-twig-extensions/twig';

// Import custom stylesheet for StorybookJS.
import "../components/assets/styles/index.scss";

addDrupalExtensions(Twig);

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Project', 'Bixal', 'USWDS'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
