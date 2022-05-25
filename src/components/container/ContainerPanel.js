import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, Card, Space, Spin } from 'antd'
import { metaFactory } from '../../api/factory/common_factory'
import { HomeOutlined } from '@ant-design/icons'
import AlertDescription from '../alert/AlertDescription'
import CloudPcTopMenu from '../topSubmenu/CloudPcTopMenu'

const ContainerLoading = () => {
  return (
    <>
      <div className="container-loader">
        <Spin size="large" />
      </div>
    </>
  )
}

const ContainerPanel = ({ loading, routeMeta, children, height }) => {
  const navigate = useNavigate()
  const [meta, setMeta] = useState({})

  useEffect(() => {
    if (routeMeta) {
      setMeta(metaFactory(routeMeta))
    }
  }, [routeMeta])

  const onRedirect = () => {
    navigate('/dashboard', { replace: true })
  }

  return (
    <>
      <Card
        className="container-panel"
        style={{ height: height }}
        title={<div className="container-title">{meta.ctrTitle}</div>}
        bordered={false}
        extra={
          <>
            <Space>
              <Breadcrumb separator=">" style={{ fontSize: '13px' }}>
                <Breadcrumb.Item
                  style={{ cursor: 'pointer' }}
                  onClick={onRedirect}
                >
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">Cloud PC 정보</Breadcrumb.Item>
                <Breadcrumb.Item href="">Cloud PC 목록</Breadcrumb.Item>
              </Breadcrumb>
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
        {loading === true ? <ContainerLoading /> : children}
      </Card>
    </>
  )
}

export default ContainerPanel
