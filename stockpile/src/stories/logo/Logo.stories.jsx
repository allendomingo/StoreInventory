import 'components/stockpile.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from 'components/logo';

export default {
  title: 'Logo/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <div className="stockpile-content-container">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      defaultValue: 64,
      options: [16, 32, 40, 50, 64, 80, 100],
    },
    shape: {
      control: 'select',
      defaultValue: 'square',
      options: ['square', 'rounded square', 'circle'],
    },
  },
};

export const StockflowLogo = ({ size, shape }) => <Logo size={size} shape={shape} />;
StockflowLogo.propTypes = {
  size: PropTypes.number.isRequired,
  shape: PropTypes.string.isRequired,
};
