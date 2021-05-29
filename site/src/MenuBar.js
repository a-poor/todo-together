import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

function MenuBar() {
    const [ tabKey, setTabKey ] = useState("lists");
    return <>
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
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[tabKey]} style={{  }}>
                <Menu.Item key="lists" onClick={() => setTabKey("lists")} onSelect={()=>console.log("Selected 1")}>
                    <Tooltip title="ToDo Lists">
                    <FormOutlined style={{ fontSize: "24px" }}/>
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key="friends" onClick={() => setTabKey("friends")} onSelect={()=>console.log("Selected 2")}>
                    <Tooltip title="Friends">
                    <UserOutlined style={{ fontSize: "24px" }}/>
                    </Tooltip>
                </Menu.Item>
                <Menu.Item key="settings" onClick={() => setTabKey("settings")} onSelect={()=>console.log("Selected 3")}>
                    <Tooltip title="Settings">
                    <SettingOutlined style={{ fontSize: "24px" }}/>
                    </Tooltip>
                </Menu.Item>
                </Menu>
            </Col>
            </Row>
        </Header>
    </>;
}

export default MenuBar;
