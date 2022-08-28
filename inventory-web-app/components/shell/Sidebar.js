import { Layout, Menu, Dropdown } from 'antd';
import { useRouter } from 'next/router'; 
import Link from 'next/link';
import React, { useState } from 'react';
import classnames from 'classnames';
import { UserOutlined, ArrowLeftOutlined, ArrowRightOutlined, UpOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import { ROLES_TO_VISIBLE_SIDEMENU_ITEMS_MAP, SIDEMENU_ITEMS } from 'constants/sidebar.js'

const Sidebar = ({ user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [width, setWidth] = useState("15%");
  const router = useRouter();
  const { Sider } = Layout;
  
  const visibleSideMenuItems = ROLES_TO_VISIBLE_SIDEMENU_ITEMS_MAP[user.role] ?? [];
  const sideMenuItems = SIDEMENU_ITEMS.filter(item => visibleSideMenuItems.includes(item.key));

  const onRouteClick = (path) => {
    router.push(`/${path}`)
  }

  const onBreakpoint = (broken) => {
    if (broken) {
      setSidebarCollapsed(true);
      setWidth(300);
    } else {
      setSidebarCollapsed(false);
      setWidth("15%");
    }
  }

  const UserDropdown = (
    <Menu
      items={[
        {
          key: 'settings',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="/settings">
              Settings
            </a>
          ),
          icon: <SettingOutlined />,
        },
        {
          key: 'logout',
          label: (
            <div onClick={() => {} /* Replace with logout */}>
              Logout
            </div>
          ),
          icon: <LogoutOutlined />,
          danger: true,
        },
      ]}
    />
  );

  return (
    <Sider trigger={null} theme="light" collapsible collapsed={sidebarCollapsed} width={width} breakpoint="md" onBreakpoint={(broken) => onBreakpoint(broken)}>
      <div className="relative h-full">
        <div className="relative flex justify-center items-center text-xl font-bold text-white h-12" style={{ backgroundColor: "#001529" }}>
          <div className={classnames("bg-white h-10 w-10 cursor-pointer", {"absolute left-2.5": !sidebarCollapsed})} onClick={() => onRouteClick("home")}  /> {/* Logo placeholder */}
          {!sidebarCollapsed && <h1 className="cursor-pointer text-white m-0" onClick={() => onRouteClick("home")} >StockFlow</h1>}
        </div>

        <Menu theme="light" defaultSelectedKeys={router.asPath.replace("/", "")} mode="inline" items={sideMenuItems} onClick={e => onRouteClick(e.key)} />
        
        <div className={classnames("absolute bottom-0 border-t-2 border-l-0 border-r-0 border-b-0 border-solid border-gray-300 w-full h-12 flex items-center gap-2.5", { "justify-center": sidebarCollapsed, "px-5": !sidebarCollapsed })} onClick={() => onRouteClick("profile")}>
          <UserOutlined className="border-2 border-solid border-gray-300 rounded-2xl w-7 h-7 flex justify-center items-center cursor-pointer" />
          {
            !sidebarCollapsed && (
              <>
                {`${user.firstName} ${user.lastName}`}
                <Dropdown overlay={UserDropdown} overlayClassName="absolute w-2/12">
                  <UpOutlined className="ml-auto mr-0 cursor-pointer"/>
                </Dropdown>
              </>
            )
          }
        </div>

        <button
          className="bg-white rounded-r-3xl border-transparent cursor-pointer absolute w-12 h-24 flex justify-center items-center"
          style={{ right: -30 }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        </button>
      </div>
    </Sider>
  );
};
  
export default Sidebar;