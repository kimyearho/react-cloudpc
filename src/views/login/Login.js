import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Checkbox, Card, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authUser, userAccount } from '../../store/modules/user'
import { JsonFormatter } from 'react-json-formatter'
import request from '../../utils/request'
import _ from 'lodash'

function Login() {
  useEffect(() => {
    request
      .get('/v1/nauth/system/portals/ui/AAA/public/user')
      .then(({ data }) => console.log(data))
  }, [])

  const dispatch = useDispatch()
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  const userAccountInfo = useSelector((state) => state.user.userAccount)

  const JsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    numberStyle: { color: 'darkorange' }
  }

  const onFinish = async (values) => {
    if (!_.isEmpty(values)) {
      console.log('Received values of form: ', values)
      if (!isAuthentication) {
        const { payload } = await dispatch(authUser(values))
        const { acct_id } = payload.data
        const { authorization } = payload.headers
        if (!_.isEmpty(acct_id)) {
          const params = {
            acctId: acct_id,
            accessToken: authorization
          }
          const userInfo = await dispatch(userAccount(params))
          console.log('userInfo', userInfo)
        }
      } else {
        //
        console.log('로그인 중')
        console.log(JSON.stringify(userAccountInfo))
      }
    }
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
        <JsonFormatter
          json={JSON.stringify(userAccountInfo)}
          tabWith="4"
          JsonStyle={JsonStyle}
        />
      </Col>
    </Row>
  )
}

export default Login
