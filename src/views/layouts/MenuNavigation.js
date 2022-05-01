import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routers } from '../../router/router'
import { Row, Col, Menu } from 'antd'

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
      <Row>
        <Col span={24}>
          <Menu
            mode="horizontal"
            selectedKeys={[currentKey]}
            items={routers}
            onClick={onCurrentKey}
          />
        </Col>
      </Row>
    </>
  )
}

export default MenuNavigation
