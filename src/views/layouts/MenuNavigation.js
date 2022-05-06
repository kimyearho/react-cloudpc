import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routers } from '../../router/router'
import { Menu, Space, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import logo from '../../assets/images/skb_logo.png'

function MenuNavigation() {
  const location = useLocation()
  const [currentKey, setCurrentKey] = useState('main')

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    setCurrentKey(path)
  }, [location])

  const onCurrentKey = (e) => {
    setCurrentKey(e.key)
  }

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
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              </Space>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuNavigation
