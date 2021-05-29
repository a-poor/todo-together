import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

import './App.css';
import 'antd/dist/antd.css';

import React from 'react';

import MenuBar from './MenuBar';
import TodoPage from './TodoListPage/TodoListPage';
import FriendsPage from './FriendsPage/FriendsPage';
import SettingsPage from './SettingsPage/SettingsPage';
import AllListsPage from './AllListsPage/AllListsPage';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function App() {
  return (
    <div className="App">
      <Layout>
        <MenuBar />
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
              <Row>
                <Col span={ 5 }>
                  <ListList items={ list_data }/>
                </Col>
                <Col span={ 12 } offset={ 1 }>
                  <TodoList items={ todo_data }/>
                </Col>
                <Col span={ 5 } offset={ 1 }>
                  <FriendList items={ friend_data }/>
                </Col>
              </Row>
            </Content>
          </Layout>
          <AllListsPage />
        </Layout>
      </Layout>
    </div>
  );
}


const friend_data = [
  {name: "Me", color: "#ff4d4f"},
  {name: "Sally", color: "#40a9ff"},
  {name: "Tim", color: "#ff7a45"},
  {color: "#bae637"},
];

const todo_data = [
  {text: "Milk", isChecked: false},
  {text: "Cookies", isChecked: true},

];

const arange = n => new Array(n).fill(null).map((_,i) => i);

const n_lists = 20;
const list_data = arange(n_lists).map(i => ({
  name: `list-${i}`, 
  size: Math.floor(Math.random() * 3 + 1)
}));

function TodoListItem({ text = "", isChecked = false }) {
  return <List.Item>
    <Checkbox >
      <Text>{ text }</Text>
    </Checkbox>
  </List.Item>
}

function TodoList({ list_title = "Your List", items = [] }) {
  return <> 
    <List 
      header={ <h1>{ list_title }</h1> }
      // bordered
      dataSource={ items }
      renderItem={ d => <TodoListItem {...d}/>}
    />
  </>;
}

function FriendListItem({ name = "", color="" }) {
  return <List.Item>
      <Space>
        { name ? <Avatar style={{ backgroundColor: color }}>{name[0]}</Avatar> : <Avatar icon={ <UserOutlined /> } style={{ backgroundColor: color }}/> }
        { name }
      </Space>
  </List.Item>
}

function FriendList({ items = [] }) {
  return <> 
    <List 
      header={ <h1>ToDo-ers</h1> }
      // bordered
      dataSource={ items }
      renderItem={ d => <FriendListItem {...d}/>}
    />
  </>;
}

function ListListItem({ name = "", size=1 }) {
  return <List.Item>
      <Space>
        <Avatar.Group>
          { arange(size).map(i =>   
            <Avatar icon={ <UserOutlined /> } style={{ backgroundColor: null }}/>
          )}
        </Avatar.Group>
        { name }
      </Space>
  </List.Item>
}

function ListList({ items = [] }) {
  return <> 
    <List 
      header={ <h1>ToDo Lists</h1> }
      // bordered
      dataSource={ items }
      renderItem={ d => <ListListItem {...d}/>}
      style={{
        overflow: 'auto',
        height: '500px',
      }}
    />
  </>;
}

export default App;
