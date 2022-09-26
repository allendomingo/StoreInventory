import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'components/stockpile.css';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export default {
  title: 'Ant Design Examples/Menu',
  component: Menu,
  argTypes: {
    mode: {
      control: 'select',
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical', 'inline'],
    },
    openOnlyCurrent: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

/* Reference: https://ant.design/components/menu/#components-menu-demo-horizontal */
export const BasicUsage = ({ mode, openOnlyCurrent, theme }) => {
  const [current, setCurrent] = useState('1');
  const [openKeys, setOpenKeys] = useState([]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const onOpenChange = (keys) => {
    if (!openOnlyCurrent) {
      setOpenKeys(keys);
      return;
    }

    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      mode={mode}
      items={items}
      theme={theme}
    />
  );
};
BasicUsage.propTypes = {
  mode: PropTypes.string.isRequired,
  openOnlyCurrent: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
};
