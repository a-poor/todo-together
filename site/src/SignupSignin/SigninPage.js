import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout, Menu, Typography, Form, Input, Button, Divider } from 'antd';

import * as api from '../api/index';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;


function SigninPage({ setUserData }) {
    const history = useHistory();
    const [errorViz, setErrorViz] = useState(false);

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
        <div
            style={{ 
                textAlign: 'center'
            }}
        >
            <Text 
                type="danger"
                style={{ 
                    display: errorViz ? 'inline' : 'none' 
                }}
            >
                Oh no, error signing in!
            </Text>
        </div>
        <Form
            layout="vertical"
            style={{ 
                maxWidth: '300px',
                margin: 'auto'
            }}
            onFinish={({username, password}) => {
                console.log("Finished!", JSON.stringify(username));
                // fetch(
                //     "/api/users/new",
                //     {
                //         method: "POST",
                //         headers: {
                //             "Accept": "application/json",
                //             "Content-Type": "application/json"
                //         },
                //         body: JSON.stringify({
                //             username,
                //             password
                //         })
                //     }
                // )
                // .then(r => r.json())
                api.auth.authUser(username, password)
                .then(r => {
                    if (r.success) {
                        console.log("SUCCESS!");
                        console.log(r);
                        setUserData(r.user);
                        history.push("/");
                    } else {
                        throw new Error("Error signing in:", r)
                    }
                })
                .catch(e => {
                    console.error("Error signing in: ", e);
                    setErrorViz(true);
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
            <Form.Item style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit">
                    Sign In
                </Button>
            </Form.Item>
        </Form>
        <div style={{ maxWidth: "250px", margin: 'auto' }}>
            <Divider/>
        </div>
        <div style={{ textAlign: 'center' }}>
            <Text>
                Or, <Link to="/sign-up">Sign Up</Link> now!
            </Text>
        </div>
    </div>;
}

export default SigninPage;