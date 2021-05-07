const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-toolbars"],
  typescript: {
    reactDocgen: false
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("../node_modules/@emotion/react"),
          "emotion-theming": toPath("../node_modules/@emotion/react")
        },
        plugins: [new TsconfigPathsPlugin({})]
      }
    };
  }
};
