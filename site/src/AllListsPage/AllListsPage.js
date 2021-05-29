import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar, Table } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const dataSource = [
    {name: "Groceries", users: ["Me", "Lauren"]},
    {name: "Wish List", users: ["Me"]},
    {name: "Weekend Plans", users: ["Me", "Lauren"]},
    {name: "Blog Ideas", users: ["Me"]}
];


function AllListsPage() {
    return <List 
        dataSource={ dataSource }
        renderItem={d => (
            <List.Item>
                { d.name }
            </List.Item>
        )}
    />;
}

function ListItem() {
    return <> </>;
}

export default AllListsPage;