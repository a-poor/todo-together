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
import SignupPage from './SignupSignin/SignupPage';
import SigninPage from './SignupSignin/SigninPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import api from './api/index';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function App() {
  const [ tabKey, setTabKey ] = useState("lists");

  return (
    <Router className="App">
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
                <Switch>
                <Route path="/sign-up">
                    <SignupPage />
                  </Route>
                  <Route path="/sign-in">
                    <SigninPage />
                  </Route>
                  <Route path="/settings">
                    <SettingsPage />
                  </Route>
                  <Route path="/friends">
                    <FriendsPage />
                  </Route>
                  <Route 
                    path="/lists/:listid"
                    exact
                    render={({ match }) => {
                      const lid = match.params.listid;
                      return <p>List ID: { lid } :: { JSON.stringify(match) }</p>
                    }}
                  />
                  <Route path="/lists">
                    <Redirect to="/"/>
                  </Route>
                  <Route path="/">
                    <AllListsPage />
                  </Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}


export default App;
