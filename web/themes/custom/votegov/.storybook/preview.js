// USWDS JS for interactive components.
import "@uswds/uswds";

// Import custom stylesheet for StorybookJS.
import "../src/stories/assets/styles/index.scss";

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // Make sure Welcome is always first.
      storySort: {
        order: ["Welcome"],
      },
    },
  },
  docs: {
    toc: true, // Autogenerate table of contents.
    canvas: {
      sourceState: "shown", // Show markup.
    },
  },
  tags: ["autodocs"],
};

export default preview;
