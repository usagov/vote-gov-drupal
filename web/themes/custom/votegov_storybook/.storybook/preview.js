// USWDS JS for interactive components.
import "@uswds/uswds";

// Import custom stylesheet for StorybookJS.
import "../stories/assets/styles/index.scss";

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
