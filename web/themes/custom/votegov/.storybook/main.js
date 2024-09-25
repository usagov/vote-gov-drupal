/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    // "../src/stories/**/*.mdx",
    // "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    '../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  // Allows you to use USWDS images and fonts.
  staticDirs: ["../node_modules/@uswds/uswds/dist", "../src/stories/assets"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
};
export default config;

