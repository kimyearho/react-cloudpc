import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Breadcrumb, Card, Space } from 'antd'
import { metaFactory } from '../../api/factory/common_factory'
import { HomeOutlined } from '@ant-design/icons'
import AlertDescription from '../alert/AlertDescription'
import CloudPcTopMenu from '../topSubmenu/CloudPcTopMenu'

const ContainerPanel = ({ children, routeMeta }) => {
  const navigate = useNavigate()
  const [meta, setMeta] = useState({})

  useEffect(() => {
    if (routeMeta) {
      setMeta(metaFactory(routeMeta))
    }
  }, [routeMeta])

  const onRedirect = () => {
    navigate('/main', { replace: true })
  }

  return (
    <>
      <Card
        className="container-panel"
        title={<div className="container-title">{meta.ctrTitle}</div>}
        bordered={false}
        extra={
          <>
            <Space>
              <Breadcrumb separator=">">
                <Breadcrumb.Item
                  style={{ cursor: 'pointer' }}
                  onClick={onRedirect}
                >
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">Cloud PC 정보</Breadcrumb.Item>
                <Breadcrumb.Item href="">Cloud PC 목록</Breadcrumb.Item>
              </Breadcrumb>
              {/* <Button
                type="link"
                icon={<CloseOutlined />}
                onClick={onRedirect}
              /> */}
            </Space>
          </>
        }
      >
        {meta.ctrShowAlert && (
          <AlertDescription
            alertTitle={meta.alertTitle}
            alertMessage={meta.alertMessage}
          />
        )}
        {meta.ctrTopSubmenu && <CloudPcTopMenu />}
        {children}
      </Card>
    </>
  )
}

export default ContainerPanel
