import { useState } from 'react';
import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar, Form, Input, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;

function signinUser(username, password) {

}

function SigninPage() {
    return <>
        <Title>Sign In</Title>
        <Form
            initialValues={{remember: true}}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {required: true},
                    {message: "Please enter your username"}
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {required: true},
                    {message: "Please enter your username"}
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>;
}

export default SigninPage;