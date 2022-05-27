import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { routers } from '../../router/router'
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

const ContainerWrapper = ({ loading, routeMeta, children, height }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [meta, setMeta] = useState({})

  const routes = routers[0].children
  const currentRoute = routes.filter((item) => item.path === pathname)

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
                {currentRoute.map((item) => (
                  <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
                ))}
                {currentRoute.map((item) =>
                  item.children
                    ? item.children.map((child) => (
                        <Breadcrumb.Item key={child.key}>
                          {child.label}
                        </Breadcrumb.Item>
                      ))
                    : null
                )}
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

export default ContainerWrapper
