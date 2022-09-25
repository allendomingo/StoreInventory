import React from 'react';
import PropTypes from 'prop-types';
import 'components/stockpile.css';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const menu = (
  <Menu
    items={[
      {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);

export default {
  title: 'Ant Design Examples/Dropdown',
  component: Dropdown,
  argTypes: {
    placement: {
      control: 'select',
      defaultValue: 'bottomLeft',
      options: ['bottom', 'bottomLeft', 'bottomRight', 'top', 'topLeft', 'topRight'],
    },
    trigger: {
      control: 'select',
      defaultValue: 'click',
      options: ['click', 'hover'],
    },
  },
};

/* Reference: https://ant.design/components/dropdown */
export const BasicUsage = ({ placement, trigger }) => (
  <Container>
    <Dropdown overlay={menu} placement={placement} trigger={[trigger]}>
      <button type="button" onClick={(e) => e.preventDefault()}>
        <Space>
          Menu
          <DownOutlined />
        </Space>
      </button>
    </Dropdown>
  </Container>
);
BasicUsage.propTypes = {
  placement: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired,
};
