import { Layout, Menu, Button, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar, Table } from 'antd';
import { UserOutlined, LaptopOutlined, ShareAltOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
    Link,
  } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;

const dataSource = [
    {id: "abc123", created: "05/20/2020", name: "Groceries", owner: "Me", users: ["Me", "Lauren"]},
    {id: "a1b2c3", created: "01/01/2021", name: "Wish List", owner: "Me", users: ["Me"]},
    {id: "c32a1b", created: "10/28/2019", name: "Weekend Plans", owner: "Lauren", users: ["Me", "Lauren", "Sandwich"]},
    {id: "b2ac13", created: "03/01/2021", name: "Blog Ideas", owner: "Me", users: ["Me"]}
];

const columns = [
    {
        title: "ToDoers",
        dataIndex: "users",
        render: (users, record) => (
            <Link to={`/lists/${record.id}`}>
                <Avatar.Group
                    size={{sm: "small", default: "default"}}
                    >
                    { users.map((u,i) => <Avatar key={i}>{ u[0].toUpperCase() }</Avatar> )}
                </Avatar.Group>
            </Link>
        )
    },
    {
        title: "List Name",
        dataIndex: "name",
        render: (name, record) => <Link to={`/lists/${record.id}`}>{ name }</Link>
    },
    {
        title: "List Owner",
        dataIndex: "owner",
        render: (user, record) => (
            <Space>
                <Avatar size="small">{ user[0].toUpperCase() }</Avatar>
                <Text>{ user }</Text>
            </Space>
        ) 
    },
    {
        title: "Actions",
        dataIndex: "id",
        render: (id, record) => (
            <Space>
                <Button href={`/lists/${record.id}`} type="secondary" shape="circle"><EditOutlined /></Button>
                <Button type="primary" shape="circle"><ShareAltOutlined /></Button>
                <Button danger type="primary" shape="circle"><DeleteOutlined /></Button>
            </Space>
        )
    },
];


function AllListsPage() {
    return <>
        <Title>To-Do Lists</Title>
        <Table 
            dataSource={ dataSource }
            columns={columns}
            scroll={{ x: 750 }}
            onRow={(record, rowIndex) => ({
                onClick: event => { console.log(`[${rowIndex}}] ${JSON.stringify(record)}`) }
            })}
        />
    </>;
}

export default AllListsPage;