import { Layout, Menu, Button, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar, Table } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const dataSource = [
    {id: "abc123", name: "Groceries", owner: "Me", users: ["Me", "Lauren"]},
    {id: "a1b2c3", name: "Wish List", owner: "Me", users: ["Me"]},
    {id: "c32a1b", name: "Weekend Plans", owner: "Lauren", users: ["Me", "Lauren", "Sandwich"]},
    {id: "b2ac13", name: "Blog Ideas", owner: "Me", users: ["Me"]}
];

const columns = [
    {
        title: "ToDoers",
        dataIndex: "users",
        render: users => (
            <Avatar.Group>
                { users.map((u,i) => <Avatar key={i}>{ u[0].toUpperCase() }</Avatar> )}
            </Avatar.Group>
        )
    },
    {
        title: "List Name",
        dataIndex: "name"
    },
    {
        title: "List Owner",
        dataIndex: "owner",
        render: u => (
            <Space>
                <Avatar>{ u[0].toUpperCase() }</Avatar>
                <Text>{ u }</Text>
            </Space>
        ) 
    },
    {
        title: "Actions",
        dataIndex: "id",
        render: id => (
            <Space>
                <Button type="primary" shape="round">Open</Button>
                <Button type="secondary" shape="round">Share</Button>
                <Button danger type="primary" shape="round">Delete</Button>
            </Space>
        )
    },
];


function AllListsPage() {
    return <Table 
        dataSource={ dataSource }
        columns={columns}
    />;
}

export default AllListsPage;