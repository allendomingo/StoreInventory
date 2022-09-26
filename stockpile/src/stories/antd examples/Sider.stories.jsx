import 'components/stockpile.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const MainLayout = styled(Layout)`
  min-height: 100vh;

  .ant-menu-item {
    margin: 0;
  }
`;

const LogoHeader = styled.div`
  height: 64px;
  padding: 16px;
  background: #001529;
`;

const Logo = styled.div`
  height: 32px;
  background: rgba(128, 128, 128, 0.7);
`;

const ContentLayout = styled(Layout)`
  ${({ theme }) => (theme === 'dark' && `
    background: #141414;

    .ant-breadcrumb {
      color: rgba(255, 255, 255, 0.85)
    }

    .ant-breadcrumb li:last-child {
      color: rgba(255, 255, 255, 0.45)
    }
  `)}
`;

const StyledHeader = styled(Header)`
  background: #001529;
  padding: 16px;
`;

const MainContentContainer = styled.div`
  ${({ theme }) => (theme === 'dark' ? `
    background: #252525;
    color: rgba(255, 255, 255, 0.85);
  ` : `
    background: #fff;
  `)}
  padding: 24px;
  min-height: 360px;
`;

const StyledFooter = styled(Footer)`
  ${({ theme }) => (theme === 'dark' && `
    background: #141414;
    color: rgba(255, 255, 255, 0.85);
  `)}
  text-align: center;
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
        <LogoHeader><Logo /></LogoHeader>
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
        <LogoHeader><Logo /></LogoHeader>
        <Menu theme={theme} defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <ContentLayout theme={theme}>
        <StyledHeader />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <MainContentContainer theme={theme}>
            Bill is a cat.
          </MainContentContainer>
        </Content>
        <StyledFooter theme={theme}>
          Ant Design ©2018 Created by Ant UED
        </StyledFooter>
      </ContentLayout>
    </MainLayout>
  );
};
InPage.propTypes = {
  theme: PropTypes.string.isRequired,
};
