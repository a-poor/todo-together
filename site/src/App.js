import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

import './App.css';
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <Row
            wrap={false}
          >
            <Col span={ 10 }>
              <Typography.Title 
                level={ 2 } 
                style={{ 
                  color: "white",
                  paddingTop: "10px",
                  paddingBottom: "5px",
                }}
                >
                ToDoTogether
              </Typography.Title>
            </Col>
            <Col span={ 5 } offset={ 9 }>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{  }}>
                <Menu.Item key="1" onClick={()=>console.log("Clicked 1")} onSelect={()=>console.log("Selected 1")}>
                  <Tooltip title="ToDo Lists">
                    <FormOutlined style={{ fontSize: "24px" }}/>
                  </Tooltip>
                </Menu.Item>
                <Menu.Item key="2" onClick={()=>console.log("Clicked 2")} onSelect={()=>console.log("Selected 2")}>
                  <Tooltip title="Friends">
                    <UserOutlined style={{ fontSize: "24px" }}/>
                  </Tooltip>
                </Menu.Item>
                <Menu.Item key="3" onClick={()=>console.log("Clicked 3")} onSelect={()=>console.log("Selected 3")}>
                  <Tooltip title="Settings">
                    <SettingOutlined style={{ fontSize: "24px" }}/>
                  </Tooltip>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
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
                <Col span={ 18 }>
                  <TodoList items={ todo_data }/>
                </Col>
                <Col span={ 5 } offset={ 1 }>
                  <FriendList items={ friend_data }/>
                </Col>
              </Row>
            </Content>
          </Layout>
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

function FriendListItem({ name = "", color="", isChecked = false }) {
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
      header={ <h1>ToDoers</h1> }
      // bordered
      dataSource={ items }
      renderItem={ d => <FriendListItem {...d}/>}
    />
  </>;
}

export default App;
