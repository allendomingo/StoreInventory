const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'global-require': 'off',
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src'), 'node_modules'],
      },
    },
  },
};
