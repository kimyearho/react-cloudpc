import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Carousel,
  Checkbox,
  Col,
  Card,
  Divider,
  Input,
  Form,
  Space,
  Row,
  message,
  Typography
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authUser, userAccount } from '../../store/actions/user_action'
import { SET_LOADING } from '../../store/modules/app'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthentication } = useSelector((state) => ({
    isAuthentication: state.user.userInfo.isAuthentication
  }))

  const contentStyle = {
    height: '560px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
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
            dispatch(SET_LOADING(true))
            setTimeout(() => {
              dispatch(SET_LOADING(false))
              navigate('/main', { replace: true })
              message.info('Success is Login !')
            }, 500)
          }
        }
      }
    }
  }

  return (
    <Row className="login-wrapper">
      <Col span={24} offset={16}>
        <Row>
          <Col span={12}>
            <Carousel style={{ width: 400 }} autoplay>
              <div>
                <h3 style={contentStyle}>
                  <img
                    src={
                      'https://192.168.162.45/pc/style/images/common/user_banner_03.png'
                    }
                    alt="logo1"
                  />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img
                    src={
                      'https://192.168.162.45/pc/style/images/common/user_banner_01.png'
                    }
                    alt="logo2"
                  />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img
                    src={
                      'https://192.168.162.45/pc/style/images/common/user_banner_02.png'
                    }
                    alt="logo3"
                  />
                </h3>
              </div>
            </Carousel>
          </Col>
          <Col span={12}>
            <Card className="login-box">
              <h1 className="welcome-to">
                <div>Welcome to</div>
                <p>
                  <b>Cloud PC</b> <span>For User</span>
                </p>
              </h1>
              {!isAuthentication && (
                <Form
                  className="login-form"
                  layout="horizontal"
                  initialValues={{
                    username: 'kimyearho',
                    password: '1851617kK@',
                    remember: true
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item label="아이디">
                    <Form.Item noStyle name="username" rules={rules.username}>
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        bordered={false}
                        placeholder="Username"
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item
                    label="비밀번호"
                    style={{ padding: '10px 0 10px 0' }}
                  >
                    <Form.Item noStyle name="password" rules={rules.password}>
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        bordered={false}
                        placeholder="Password"
                      />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      size="large"
                    >
                      로그인
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>아이디 저장</Checkbox>
                    </Form.Item>
                    <Space className="fr" split={<Divider type="vertical" />}>
                      <Typography.Link>아이디 찾기</Typography.Link>
                      <Typography.Link>비밀번호 찾기</Typography.Link>
                    </Space>
                  </Form.Item>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Login
