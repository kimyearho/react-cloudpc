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
  Typography
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authUser, userAccount } from '../../store/actions/user_action'
import { SET_LOADING } from '../../store/modules/app'
import { useNavigate } from 'react-router-dom'
import { notificationSuccess } from '../../components/notification/Notification'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

import banner1 from '../../assets/images/login/user_banner_01.png'
import banner2 from '../../assets/images/login/user_banner_02.png'
import banner3 from '../../assets/images/login/user_banner_03.png'

const Login = () => {
  const { t } = useTranslation()
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
        message: t('validate.login.validate_login_id')
      }
    ],
    password: [
      {
        required: true,
        message: t('validate.login.validate_login_pw')
      }
    ]
  }

  const onFinish = async (values) => {
    if (!_.isEmpty(values)) {
      if (!isAuthentication) {
        try {
          const { payload } = await dispatch(authUser(values))
          const { acct_id } = payload.data
          // const { authorization } = payload.headers
          if (!_.isEmpty(acct_id)) {
            const params = {
              acctId: acct_id
              // accessToken: authorization
            }
            const { meta } = await dispatch(userAccount(params))
            if (meta.requestStatus === 'fulfilled') {
              dispatch(SET_LOADING(true))
              setTimeout(() => {
                navigate('/dashboard', { replace: true })
                dispatch(SET_LOADING(false))
                notificationSuccess({
                  description: t('message.login.success')
                })
              }, 600)
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return (
    <Row className="login-wrapper">
      <Col span={24}>
        <Row>
          <Col span={12}>
            <Carousel style={{ width: 400, float: 'right' }} autoplay>
              <div>
                <h3 style={contentStyle}>
                  <img src={banner1} alt="logo1" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img src={banner2} alt="logo2" />
                </h3>
              </div>
              <div>
                <h3 style={contentStyle}>
                  <img src={banner3} alt="logo3" />
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
                    password: '123456789!',
                    remember: true
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item label={t('form.label.login.id')}>
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
                    label={t('form.label.login.pw')}
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
                      {t('button.login.submit')}
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>{t('form.label.login.save_id')}</Checkbox>
                    </Form.Item>
                    <Space className="fr" split={<Divider type="vertical" />}>
                      <Typography.Link>
                        {t('form.label.login.find_id')}
                      </Typography.Link>
                      <Typography.Link>
                        {t('form.label.login.find_pw')}
                      </Typography.Link>
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
