import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Checkbox,
  Col,
  Card,
  Input,
  Form,
  Row,
  Result,
  Popconfirm,
  message
} from 'antd'
import {
  UserOutlined,
  LockOutlined,
  DisconnectOutlined
} from '@ant-design/icons'
import { SET_LOGOUT } from '../../store/modules/user'
import { authUser, userAccount } from '../../store/actions/user_action'
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

  const confirm = async (e) => {
    const data = await dispatch(SET_LOGOUT())
    console.log(data)
    message.success('Click on Yes')
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
            message.info('Success is Login !')
          }
        }
      }
    }
  }

  return (
    <Row>
      <Col span={12} offset={10}>
        <Row>
          <Col span={9}>
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
              {isAuthentication && (
                <Result
                  status="success"
                  title="로그인 완료"
                  extra={
                    <Popconfirm
                      title="로그아웃 하시겠습니까?"
                      onConfirm={confirm}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        key="console"
                        icon={<DisconnectOutlined />}
                      >
                        Logout
                      </Button>
                    </Popconfirm>
                  }
                />
              )}
            </Card>
          </Col>
          <Col span={12}>
            {isAuthentication && (
              <JsonFormatter
                json={JSON.stringify(userAccountInfo)}
                tabWith="4"
                JsonStyle={JsonStyle}
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Login
