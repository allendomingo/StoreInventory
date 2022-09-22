const path = require('path');

module.exports = {
  "stories": [
    "../src/stories/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        modules: [
          ...(config.resolve.modules || []),
          path.resolve(__dirname, '../src'),
          'node_modules'
        ],
        alias: {
          ...config.resolve.alias,
          '@stockpile': path.resolve(__dirname, '../src/components')
        }
      }
    };
  }
}