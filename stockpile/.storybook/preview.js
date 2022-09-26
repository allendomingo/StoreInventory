export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// All stories expect a theme arg
export const argTypes = { theme: { control: 'select', options: ['light', 'dark'] } };

// The default value of the theme arg to all stories
export const args = { theme: 'light' };