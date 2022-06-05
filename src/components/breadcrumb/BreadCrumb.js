import React from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumb, Space } from 'antd'
import { routers } from '../../router/router'
import { HomeOutlined } from '@ant-design/icons'

/**
 * @description
 * Router 정보를 이용하여 현재 페이지의 Breadcrumb를 생성 합니다.
 *
 * @param {function} callback
 * @returns JSX
 */
const BreadCrumb = ({ callback }) => {
  const { pathname } = useLocation()
  const routes = routers[0].children
  const currentRoute = routes.filter((item) => item.path === pathname)
  const breadcrumbChildItems = () => {
    let breadcrumbItems = []
    currentRoute.forEach((item) => {
      breadcrumbItems.push(
        <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
      )
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          breadcrumbItems.push(
            <Breadcrumb.Item key={child.key}>{child.label}</Breadcrumb.Item>
          )
        })
      }
    })
    return breadcrumbItems
  }
  return (
    <>
      <Space>
        <Breadcrumb separator=">" style={{ fontSize: '13px' }}>
          <Breadcrumb.Item style={{ cursor: 'pointer' }} onClick={callback}>
            <HomeOutlined />
          </Breadcrumb.Item>
          {breadcrumbChildItems()}
        </Breadcrumb>
      </Space>
    </>
  )
}

export default BreadCrumb
