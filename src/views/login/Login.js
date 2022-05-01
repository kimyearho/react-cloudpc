import React, { useEffect } from 'react'
import { Form, Input, Button, Checkbox, Card, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import request from '../../utils/request'

function Login() {
  useEffect(() => {
    request
      .get('/v1/nauth/system/portals/ui/AAA/public/user')
      .then(({ data }) => console.log(data))
  }, [])

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  const rules = {
    username: [
      {
        required: true,
        message: 'Please input your Username!'
      }
    ],
    password: [
      {
        required: true,
        message: 'Please input your Password!'
      }
    ]
  }

  return (
    <Row>
      <Col span={12} offset={10}>
        <Card style={{ width: 300 }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item name="username" rules={rules.username}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item name="password" rules={rules.password}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Button className="login-form-forgot" type="link">
                Forgot password
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or
              <Button type="link">register now!</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Login
