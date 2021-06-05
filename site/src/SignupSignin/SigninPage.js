import { useHistory } from 'react-router-dom';
import { Layout, Menu, Typography, Form, Input, Button } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;


function SigninPage() {
    const history = useHistory();
    return <div
        style={{
            maxWidth: '500px',
            margin: 'auto'
        }}
    >
        <Title
            style={{ textAlign: 'center' }}
        >
            Sign In
        </Title>
        <Form
            layout="vertical"
            style={{ 
                maxWidth: '300px',
                margin: 'auto'
            }}
            onFinish={({username, password}) => {
                console.log("Finished!", JSON.stringify(username));
                fetch(
                    "/api/users/new",
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                ).then(r => {
                    throw new Error("");
                }).then(r => {
                    console.log("Successfully logged in!");
                    console.log(r);
                    history.push("/");
                }).catch(e => {
                    console.error("Error signing in: ", e);
                })
            }}
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
    </div>;
}

export default SigninPage;