import React from 'react'
import { useSelector } from 'react-redux'
import { Layout, Spin } from 'antd'
import { Header, Content, Footer } from 'antd/lib/layout/layout'
import { Outlet } from 'react-router-dom'
import MenuNavigation from '../views/navigation/MenuNavigation'
import staticDefaultImage from '../assets/images/portal.jpg'

const AppLayout = () => {
  const { loading, isAuthentication, meta } = useSelector((state) => ({
    loading: state.app.loading,
    isAuthentication: state.user.userInfo.isAuthentication,
    meta: state.user.portalPublic
  }))

  //* 연동 이미지가 있으면 사용하고, 없으면 기본 이미지를 사용한다.
  const ptal_bg_stor_path =
    meta['portal'].ptal_bg_stor_path === null
      ? staticDefaultImage
      : meta['portal'].ptal_bg_stor_path

  const portalImage = () => {
    if (meta && isAuthentication) {
      return {
        background: 'url(' + ptal_bg_stor_path + ') 0% 0% / cover',
        overflow: 'hidden'
      }
    }
  }

  const AppHeader = () => {
    return (
      <>
        <Header>
          <MenuNavigation />
        </Header>
      </>
    )
  }

  const contentsStyle = isAuthentication ? 'auth-content' : 'not-auth-content'
  const AppLoader = () => {
    return (
      <>
        <div className="ant-app-loader">
          <Spin className="app-loader" size="large" />
        </div>
      </>
    )
  }

  return (
    <>
      <Layout className="layout">
        {loading && <AppLoader />}
        {isAuthentication && <AppHeader />}
        <Content className={contentsStyle} style={portalImage()}>
          <div className="ant-pro-grid-content wide site-layout-content">
            <Outlet />
          </div>
          {isAuthentication && (
            <Footer className="ant-footer">
              Yeonho React Example @2022 by ken
            </Footer>
          )}
        </Content>
      </Layout>
    </>
  )
}

export default AppLayout
