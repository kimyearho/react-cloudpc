import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGOUT } from '../../store/modules/user'
import { SET_LOADING } from '../../store/modules/app'
import { Menu, Space, Avatar, Popover, Divider, Button, Row, Col } from 'antd'
import {
  UserOutlined,
  WindowsOutlined,
  CodeSandboxOutlined
} from '@ant-design/icons'
import { userInfoFactory } from '../../api/factory/user_factory'
import Icon from '@ant-design/icons'
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

  const redirectDashboard = () => {
    navigate('/dashboard', { replace: true })
  }

  const confirm = async () => {
    dispatch(SET_LOADING(true))
    setTimeout(() => {
      dispatch(SET_LOGOUT())
      navigate('/login', { replace: true })
      dispatch(SET_LOADING(false))
    }, 600)
  }

  const menus = [
    {
      key: 'dashboard',
      icon: <WindowsOutlined />,
      label: (
        <Link to="/dashboard">
          대시보드
          <Divider type="vertical" />
        </Link>
      )
    },
    {
      key: 'cpc-info',
      icon: <CodeSandboxOutlined />,
      label: (
        <Link to="/cpc-info">
          Cloud PC 정보
          <Divider type="vertical" />
        </Link>
      )
    },
    {
      key: 'cpc-setting',
      icon: <CodeSandboxOutlined />,
      label: (
        <span>
          Cloud PC 관리
          <Divider type="vertical" />
        </span>
      ),
      children: [
        {
          key: '1',
          label: <Link to="/cpc-setting">자가 오류 복구</Link>
        }
      ]
    },
    {
      key: 'cpc-support',
      icon: <CodeSandboxOutlined />,
      label: '고객 지원',
      children: [
        {
          key: '2',
          label: <Link to="/cpc-support">공지 사항</Link>
        }
      ]
    }
  ]

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
            onClick={confirm}
          >
            로그아웃
          </Button>
        </Col>
      </Row>
    </div>
  )

  return (
    <>
      <Row className="top-nav-header light">
        <Col span={6}>
          <Button className="logo" type="link" onClick={redirectDashboard}>
            <h2>INSoft Cloud PC by React</h2>
          </Button>
        </Col>
        <Col span={8} offset={2}>
          <Menu
            mode="horizontal"
            selectedKeys={[currentKey]}
            items={menus}
            onClick={onCurrentKey}
          />
        </Col>
        <Col span={4} offset={4}>
          <Space className="fr mr-10px" size={'middle'}>
            <Popover placement="bottomRight" content={content} trigger="click">
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
        </Col>
      </Row>
    </>
  )
}

export default MenuNavigation
