import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col } from 'antd';
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
                ToDo Together
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
          {/* <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider> */}
          {/* <Space></Space> */}
          <div style={{ height: "24px" }}/>
          <Layout style={{ padding: '0 24px 24px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <TodoList items={data}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

const data = [
  {text: "Milk", isChecked: false},
  {text: "Cookies", isChecked: true},

];

function ListItem({ text = "", isChecked = false }) {
  return <List.Item>
    <Checkbox >
      <Text>{ text }</Text>
    </Checkbox>
  </List.Item>
}

function TodoList({ items = [] }) {
  return <> 
    <List 
      header={ <h1>Header</h1> }
      bordered
      dataSource={ items }
      renderItem={ d => <ListItem {...d}/>}
    />
  </>;
}

export default App;
