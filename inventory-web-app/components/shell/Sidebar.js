
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { UserOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { ROLES_TO_VISIBLE_SIDEMENU_ITEMS_MAP, SIDEMENU_ITEMS } from 'constants/sidebar.js'

const Sidebar = ({ userRole="user", sidebarCollapsed, setSidebarCollapsed }) => {

  const { Sider } = Layout;
  
  const visibleSideMenuItems = ROLES_TO_VISIBLE_SIDEMENU_ITEMS_MAP[userRole] ?? [];
  const sideMenuItems = SIDEMENU_ITEMS.filter(item => visibleSideMenuItems.includes(item.key));

  return (
    <Sider trigger={null} theme="light" collapsible collapsed={sidebarCollapsed} width="15%" style={{ position: "fixed", height: "100%", minHeight: "100%", boxSizing: "border-box", overflowX: "visible" }}>
      <div style={{ position: "relative", height:"100%" }}>
        <div style={{ height: 50, backgroundColor: "#001529", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, fontWeight: "bold", position: "relative" }}>
          <div style={{ backgroundColor: "white", width: 40, height: 40, ...(!sidebarCollapsed && { position: "absolute", left: 10 }) }} />
          {!sidebarCollapsed && "StockFlow"}
        </div>
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={sideMenuItems} />
        <div style={{ position: "absolute", bottom: 0, borderTop: "1px solid gray", width: "100%", height: 50, display: "flex", alignItems: "center", paddingLeft: 10, gap: 10 }}>
          <UserOutlined style={{ border: "1px solid gray", borderRadius: 20, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center" }}/>
          {!sidebarCollapsed && "Username"}
        </div>
        <button 
          style={{ backgroundColor: "white", borderTopRightRadius: 25, borderBottomRightRadius: 25, borderColor: "transparent", cursor: "pointer", position: "absolute", right: -40, width: 50, height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        </button>
      </div>
    </Sider>
  );
};
  
export default Sidebar;