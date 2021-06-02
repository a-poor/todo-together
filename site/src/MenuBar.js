import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar } from 'antd';
import { MenuUnfoldOutlined, UserOutlined, LogoutOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

import { useWindowSize } from './hooks';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function MenuBar({ tabKey, setTabKey }) {
  const windowSize = useWindowSize();

  return <>
    <Header className="header">
      <Row
        wrap={false}
        >
        <Col span={8}>
          <Menu 
            theme="dark" 
            mode="horizontal" 
            defaultSelectedKeys={[ tabKey ]} 
            style={{ color: "white" }}
            >
            <SubMenu
              key=""
              icon={ <MenuUnfoldOutlined style={{ fontSize: "24px" }}/> }
              >
              <Menu.Item 
                key="lists" 
                onClick={() => setTabKey("lists")} 
                >
                <Link to="/">
                  <FormOutlined style={{ fontSize: "24px" }}/>
                  <Text style={{ color: "white" }}>To-Do Lists</Text>
                </Link>
              </Menu.Item>
              <Menu.Item 
                key="friends" 
                onClick={() => setTabKey("friends")} 
                >
                <Link to="/friends">
                  <UserOutlined style={{ fontSize: "24px" }}/>
                  <Text style={{ color: "white" }}>Friends</Text>
                </Link>
              </Menu.Item>
              <Menu.Item 
                key="settings" 
                onClick={() => setTabKey("settings")} 
                >
                <Link to="/settings">
                  <SettingOutlined style={{ fontSize: "24px" }}/>
                  <Text style={{ color: "white" }}>Settings</Text>
                </Link>
              </Menu.Item>
              <Menu.Item 
                key="sign-out" 
                onClick={() => { 
                  console.log("SIGNED OUT"); 
                  setTabKey("lists"); 
                }} 
                disabled
                >

                <LogoutOutlined style={{ fontSize: "24px" }}/>
                <Text style={{ color: "white" }}>Logout</Text>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={8}>
          <Typography.Title 
            level={ 2 } 
            style={{ 
              textAlign: "center",
              color: "white",
              paddingTop: "10px",
              paddingBottom: "5px",
            }}
            >
            { windowSize.width < 750 ? "TDTG" : "ToDoTogether" }
          </Typography.Title>
        </Col>
      </Row>
    </Header>
  </>;
}

export default MenuBar;
