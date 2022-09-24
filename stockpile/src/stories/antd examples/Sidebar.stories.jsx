import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'components/stockpile.css';
import {
  Breadcrumb,
  Layout,
  Menu,
} from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';

const {
  Header, Content, Footer, Sider,
} = Layout;

const getBackground = (theme) => {
  if (theme === 'light') {
    return '#fff';
  }
  if (theme === 'dark') {
    return '#141414';
  }
  return '#fff';
};

const MainLayout = styled(Layout)`
  min-height: 100vh;
  max-width: unset;
  background: ${({ theme }) => getBackground(theme)};

  .ant-menu-item {
    margin: 0;
  }

  .svg {
    vertical-align: unset;
  }
`;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(128, 128, 128, 0.7);
`;

const ContentLayout = styled(Layout)`
  padding: 0;
  margin: 0;
  max-width: unset;
`;

const StyledHeader = styled(Header)`
  background: ${({ theme }) => (theme === 'dark' ? '#001529' : '#fff')};
  padding: 16px;
`;

const MainContentContainer = styled.div`
  background: ${({ theme }) => getBackground(theme)};
  padding: 24px;
  min-height: 360px;
`;

function makeItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  makeItem('Option 1', '1', <PieChartOutlined />),
  makeItem('Option 2', '2', <DesktopOutlined />),
  makeItem('User', 'sub1', <UserOutlined />, [
    makeItem('Tom', '3'),
    makeItem('Bill', '4'),
    makeItem('Alex', '5'),
  ]),
  makeItem('Team', 'sub2', <TeamOutlined />, [makeItem('Team 1', '6'), makeItem('Team 2', '8')]),
  makeItem('Files', '9', <FileOutlined />),
];

export default {
  title: 'Ant Design Examples/Sider',
  component: Sider,
};

export const Main = ({ theme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <MainLayout theme={theme}>
      <Sider
        theme={theme}
        collapsible
        collapsed={isCollapsed}
        onCollapse={(value) => setIsCollapsed(value)}
      >
        <Logo />
        <Menu theme={theme} defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </MainLayout>
  );
};
Main.propTypes = {
  theme: PropTypes.string.isRequired,
};

/* Reference: https://ant.design/components/layout/#components-layout-demo-side  */
export const InPage = ({ theme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <MainLayout theme={theme}>
      <Sider
        theme={theme}
        collapsible
        collapsed={isCollapsed}
        onCollapse={(value) => setIsCollapsed(value)}
      >
        <Logo />
        <Menu theme={theme} defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <ContentLayout>
        <StyledHeader theme={theme} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <MainContentContainer>
            Bill is a cat.
          </MainContentContainer>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </ContentLayout>
    </MainLayout>
  );
};
InPage.propTypes = {
  theme: PropTypes.string.isRequired,
};
