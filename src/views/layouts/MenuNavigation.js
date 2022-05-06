import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { routers } from '../../router/router'
import { SET_LOGOUT } from '../../store/modules/user'
import { SET_LOADING } from '../../store/modules/app'
import { Menu, Space, Avatar, Popover, Divider, Button, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { userInfoFactory } from '../../api/factory/user_factory'
import Icon from '@ant-design/icons'
import logo from '../../assets/images/skb_logo.png'
import ko from '../../assets/images/ko.png'

function MenuNavigation() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [currentKey, setCurrentKey] = useState('main')
  const userInfo = useSelector((state) => state.user.userAccount)
  const useFactory = userInfoFactory(userInfo || '')

  const userInfoValues = []
  const userInfoLabels = ['GROUP', 'ID', 'NAME', 'DATE']
  Object.entries(useFactory).map((item, index) =>
    userInfoValues.push({ label: userInfoLabels[index], value: item[1] })
  )

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    setCurrentKey(path)
  }, [location])

  const onCurrentKey = (e) => {
    setCurrentKey(e.key)
  }

  const confirm = async () => {
    dispatch(SET_LOADING(true))
    setTimeout(() => {
      dispatch(SET_LOGOUT())
      dispatch(SET_LOADING(false))
      navigate('/login', { replace: true })
    }, 1000)
  }

  const content = (
    <div className="shotcut-popup">
      {userInfoValues.map((item, index) => (
        <Row key={index}>
          <Col span={6}>{item.label}</Col>
          <Col span={2}>
            <Divider className="shotcut-divider" type="vertical" />
          </Col>
          <Col span={16} className="shotcut-menu-item">
            {item.value}
          </Col>
        </Row>
      ))}
      <Divider className="shotcut-menu" />
      <Row>
        <Col span={12}>
          <Button className="shotcut-menu-action" size="small" ghost>
            회원정보변경
          </Button>
        </Col>
        <Col span={12}>
          <Button
            className="shotcut-menu-action"
            size="small"
            ghost
            style={{ marginLeft: '15px', float: 'right' }}
            onClick={() => confirm()}
          >
            로그아웃
          </Button>
        </Col>
      </Row>
    </div>
  )

  return (
    <>
      <div className="ant-pro-top-nav-header light">
        <div className="ant-pro-top-nav-header-main wide">
          <div className="ant-pro-top-nav-header-main-left">
            <div className="ant-pro-top-nav-header-logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="ant-pro-top-nav-header-menu">
            <Menu
              mode="horizontal"
              selectedKeys={[currentKey]}
              items={routers}
              onClick={onCurrentKey}
            />
          </div>
          <div className="ant-pro-right-content ant-space-right">
            <div className="ant-pro-right-content-resize">
              <Space size={'middle'}>
                <Popover
                  placement="bottomLeft"
                  content={content}
                  trigger="click"
                >
                  <Avatar
                    style={{ backgroundColor: '#096dd9', cursor: 'pointer' }}
                    icon={<UserOutlined />}
                  />
                </Popover>
                <Button ghost>
                  <Icon
                    style={{ verticalAlign: 'text-bottom' }}
                    component={() => <img src={ko} alt="language" />}
                  />
                  한국어
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuNavigation
