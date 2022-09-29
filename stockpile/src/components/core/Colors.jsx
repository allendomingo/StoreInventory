import {
  generate, cyan, grey, presetPalettes, presetDarkPalettes,
} from '@ant-design/colors';

const secondary = '#00203F';

const Colors = {
  primary: cyan,
  secondary: generate(secondary),
  neutral: grey,
  ...presetPalettes,
  ...Object.entries(presetDarkPalettes)
    .reduce((acc, [key, value]) => {
      acc[`${key}-dark`] = value;
      return acc;
    }, {}),
};

export default Colors;
