import 'components/stockpile.css';
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from 'components/core';

const getTextColor = (color) => {
  const rgb = [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)];
  const totalValue = rgb.reduce((prev, cur) => prev + Number.parseInt(cur, 16), 0);
  if (totalValue <= 384) {
    return '#fff';
  }
  return 'rgba(0, 0, 0, 0.85)';
};

const AllColorPalettesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
`;

const PaletteContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const PaletteTitle = styled.header`
  width: 100%;
  text-align: center;
  color: #5c6b77;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  text-transform: capitalize;
`;

const Palette = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;

  div:first-child {
    border-radius: 4px 4px 0 0;
  }

  div:last-child {
    border-radius: 0 0 4px 4px;
  }

  div:hover {
    width: 340px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const ColorBar = styled.div`
  height: 40px;
  width: 100%;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  background: ${({ color }) => color};
  color: ${({ color }) => getTextColor(color)};
  font-size: 12px;
  font-family: Consolas,sans-serif;
  line-height: 40px;
  cursor: pointer;
  transition: all .2s ease;
`;

const ColorItem = ({ name, value }) => (
  <ColorBar color={value}>
    <span>{name}</span>
    <span>{value}</span>
  </ColorBar>
);
ColorItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default {
  title: 'Core/Colors',
  component: Colors,
  decorators: [
    (Story) => (
      <div className="stockpile-content-container">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: {
      name: 'sample color',
      control: 'select',
      defaultValue: 'primary',
      options: Object.keys(Colors),
    },
  },
};

export const ColorPalette = ({ color }) => {
  const palette = Colors[color];
  return (
    <PaletteContainer>
      <PaletteTitle className="color-title">{color}</PaletteTitle>
      <Palette>
        {palette.map((value, index) => <ColorItem name={`${color}-${index}`} value={value} />)}
      </Palette>
    </PaletteContainer>
  );
};
ColorPalette.propTypes = {
  color: PropTypes.string.isRequired,
};

export const AllColorPalettes = () => (
  <AllColorPalettesContainer>
    {Object.keys(Colors).map((color) => <ColorPalette color={color} />)}
  </AllColorPalettesContainer>
);
