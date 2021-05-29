import { Layout, Menu, Divider, Typography, Space, Tooltip, Row, Col, Avatar } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

import './App.css';
import 'antd/dist/antd.css';

import React, { useState } from 'react';

import MenuBar from './MenuBar';
import TodoListPage from './TodoListPage/TodoListPage';
import FriendsPage from './FriendsPage/FriendsPage';
import SettingsPage from './SettingsPage/SettingsPage';
import AllListsPage from './AllListsPage/AllListsPage';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function App() {
  const [ tabKey, setTabKey ] = useState("lists");
  const getTab = t => {
    switch (t) {
      case 'lists':
        return <AllListsPage />;
      case 'friends':
        return <FriendsPage />;
      case 'settings':
        return <SettingsPage />;
    }
  };

  return (
    <div className="App">
      <Layout>
        <MenuBar {...{tabKey, setTabKey}}/>
        <Layout>
          <div style={{ height: "24px" }}/>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
              >
              <Typography.Title>{
                {
                  lists: "Your To-Do Lists",
                  friends: "Your Friends",
                  settings: "Account Settings"
                }[tabKey]  
              }</Typography.Title>
              { getTab(tabKey) }

              <Divider />

              <TodoListPage />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}


export default App;
