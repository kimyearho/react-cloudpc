import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Col, Card, Input, Form, Row, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authUser, userAccount } from '../../store/actions/user_action'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthentication } = useSelector((state) => ({
    isAuthentication: state.user.userInfo.isAuthentication
  }))

  const rules = {
    username: [
      {
        required: true,
        message: '아이디를 입력해주세요.'
      }
    ],
    password: [
      {
        required: true,
        message: '비밀번호를 입력해주세요.'
      }
    ]
  }

  const onFinish = async (values) => {
    if (!_.isEmpty(values)) {
      if (!isAuthentication) {
        const { payload } = await dispatch(authUser(values))
        const { acct_id } = payload.data
        const { authorization } = payload.headers
        if (!_.isEmpty(acct_id)) {
          const params = {
            acctId: acct_id,
            accessToken: authorization
          }
          const { meta } = await dispatch(userAccount(params))
          if (meta.requestStatus === 'fulfilled') {
            navigate('/main', { replace: true })
            message.info('Success is Login !')
          }
        }
      }
    }
  }

  return (
    <Row style={{ marginTop: '150px' }}>
      <Col span={24} offset={10}>
        <Card style={{ width: 300 }}>
          {!isAuthentication && (
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
              <Form.Item
                style={{ padding: '10px 0 10px 0' }}
                name="password"
                rules={rules.password}
              >
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
          )}
        </Card>
      </Col>
    </Row>
  )
}

export default Login
