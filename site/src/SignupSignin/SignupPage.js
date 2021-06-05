import { useState } from 'react';
import { Layout, Menu, Breadcrumb, List, Checkbox, Typography, Space, Tooltip, Row, Col, Avatar, Form, Input, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FormOutlined, SettingOutlinedm, CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;


const MIN_PASS_CHARS = 8;



function InputCheckMessage({ children, good = undefined }) {
    let color;
    switch (good) {
        case true:
            color = "#52c41a"; // Red
            return <Space>
                <CheckCircleTwoTone style={{fontWeight: 'bold'}} twoToneColor={color}/>
                <Text strong style={{fontWeight: 'bold', color}}>{ good }{ children }</Text>
            </Space>;
        case false:
            color = "#c4521a"; // Green
            return <Space>
                <ExclamationCircleTwoTone style={{fontWeight: 'bold'}} twoToneColor={color}/>
                <Text strong style={{fontWeight: 'bold', color}}>{ good }{ children }</Text>
            </Space>;
        default:
            color = "#c4c4c4"; // Grey
            return <Space>
                <CheckCircleTwoTone style={{fontWeight: 'bold'}} twoToneColor={color}/>
                <Text strong style={{fontWeight: 'bold', color}}>{ good }{ children }</Text>
            </Space>;
    }
}

function PassConfirmIcon({ match = undefined }) {
    return <InputCheckMessage good={match}>
        { match === false ? "Passwords Don't Match" : "Passwords Match" }
    </InputCheckMessage>;
}

function validatePassword(password = undefined) {
    return {
        length:  password ? password.length >= MIN_PASS_CHARS : undefined,
        upper:   password ? password.search(/[A-Z]/) > -1 : undefined,
        lower:   password ? password.search(/[a-z]/) > -1 : undefined,
        number:  password ? password.search(/[0-9]/) > -1 : undefined,
        symbol:  password ? password.search(/[^a-z0-9\s]/i) > -1 : undefined,
        noSpace: password ? password.search(/\s/) == -1 : undefined,
    };
}

function SignupPage() {

    // Check the password
    const [passLen,     setPassLen]     = useState(undefined);
    const [passUpper,   setPassUpper]   = useState(undefined);
    const [passLower,   setPassLower]   = useState(undefined);
    const [passNumber,  setPassNumber]  = useState(undefined);
    const [passSymbol,  setPassSymbol]  = useState(undefined);
    const [passNoSpace, setPassNoSpace] = useState(undefined);
    const passwordGood = passLen && passUpper && passLower && passNumber && passSymbol && passNoSpace;

    // Check the password confirmation
    const [passMatch, setPassMatch] = useState(undefined);


    return <>
        <Title>Sign Up</Title>
        
        <Form
            layout="vertical"
            onFieldsChange={(f,fields) => {
                const password = fields.filter(f => f.name[0] == "password")[0]?.value;
                const conf_pass = fields.filter(f => f.name[0] == "password-confirm")[0]?.value;
                
                const pval = validatePassword(password);

                setPassLen(pval.length);
                setPassUpper(pval.upper);
                setPassLower(pval.lower);
                setPassNumber(pval.number);
                setPassSymbol(pval.symbol);
                setPassNoSpace(pval.noSpace);

                setPassMatch(password ? password === conf_pass : undefined);

                console.log("a =", JSON.stringify(f,null,2))
                console.log("b =", JSON.stringify(fields,null,2))
                console.log("password =", password);
                console.log("conf_pass =", conf_pass);
            }}
            
        >
            <Form.Item
                label="Full Name"
                name="name"
                rules={[
                    {required: true},
                    {message: "Please enter your name"}
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {required: true},
                    {message: "Please enter your email"}
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {required: true},
                    {message: "Please enter your password"}
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <InputCheckMessage good={passLen}>At least {MIN_PASS_CHARS} characters.</InputCheckMessage>
                <br/>
                <InputCheckMessage good={passUpper}>At least 1 uppercase letter.</InputCheckMessage>
                <br/>
                <InputCheckMessage good={passLower}>At least 1 lowercase letter.</InputCheckMessage>
                <br/>
                <InputCheckMessage good={passNumber}>At least one digit.</InputCheckMessage>
                <br/>
                <InputCheckMessage good={passSymbol}>At least one symbol.</InputCheckMessage>
                <br/>
                <InputCheckMessage good={passNoSpace}>No spaces.</InputCheckMessage>


            </Form.Item>
            <Form.Item
                label="Confirm Password"
                name="password-confirm"
                rules={[
                    {required: true},
                    {message: "Please re-enter your password"}
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <PassConfirmIcon match={passMatch} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign-Up
                </Button>
            </Form.Item>
        </Form>
    </>;
}

export default SignupPage;