import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SquareSvg from 'assets/logo/square.svg';
import RoundedSquareSvg from 'assets/logo/rounded-square.svg';
import CircleSvg from 'assets/logo/circle.svg';

const StyledSvg = styled.img`
  ${({ size }) => `
    height: ${size}px;
    width: ${size}px;
  `}
`;

const sizes = [16, 32, 40, 50, 64, 80, 100];
const shapes = {
  square: SquareSvg,
  'rounded square': RoundedSquareSvg,
  circle: CircleSvg,
};

/**
 * Stockflow Logo
 * @param {*} size - Size of the icon in px (size*size). Defaults to 64.
 * Options: 16, 32, 40, 50, 64, 80, 100
 * @param {*} shape - Shape of the icon. Defaults to 'square'.
 * Options: square, rounded square, circle
 */
const Logo = ({ size, shape }) => {
  const checkedSize = sizes.includes(size) ? size : 64;
  const svg = shape in shapes ? shapes[shape] : SquareSvg;
  return (
    <StyledSvg src={svg} alt="Stockflow" size={checkedSize} />
  );
};
Logo.propTypes = {
  size: PropTypes.number,
  shape: PropTypes.string,
};
Logo.defaultProps = {
  size: 64,
  shape: 'square',
};

export default Logo;
