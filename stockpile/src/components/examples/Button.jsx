import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledButton = styled.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  ${({ primary }) => primary && `
    color: white;
    background-color: #1ea7fd;
  `}

  ${({ primary }) => !primary && `
    color: #333;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  `}

  ${({ size }) => size === 'small' && `
    font-size: 12px;
    padding: 10px 16px;
  `}

  ${({ size }) => size === 'medium' && `
    font-size: 14px;
    padding: 11px 20px;
  `}

  ${({ size }) => size === 'large' && `
    font-size: 16px;
    padding: 12px 24px;
  `}
`;

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary,
  backgroundColor,
  size,
  label,
  onClick,
}) => (
  <StyledButton
    type="button"
    primary={primary}
    size={size}
    style={backgroundColor && { backgroundColor }}
    onClick={onClick}
  >
    {label}
  </StyledButton>
);

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

export default Button;
