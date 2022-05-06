import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'
import { Header, Content, Footer } from 'antd/lib/layout/layout'
import { routers } from '../router/router'
import Login from '../views/login/Login'
import MenuNavigation from './layouts/MenuNavigation'
import { call_public } from '../api/user'
import { userPublicMeta } from '../api/factory/user_factory'

function App() {
  const type = 'user'
  const [meta, setMeta] = useState(null)
  const { isAuthentication } = useSelector((state) => ({
    isAuthentication: state.user.userInfo.isAuthentication
  }))

  useEffect(() => {
    call_public(type).then((res) => {
      setMeta(userPublicMeta(res))
    })
  }, [type])

  function AppHeader() {
    return (
      <>
        <Header>
          <MenuNavigation />
        </Header>
      </>
    )
  }

  function AppRoot() {
    return (
      <>
        {isAuthentication ? (
          <Navigate replace to="/main" />
        ) : (
          <Navigate replace to="/login" />
        )}
      </>
    )
  }

  function loginImage() {
    if (meta && !isAuthentication) {
      return {
        backgroundImage: 'url(' + meta['login'].lin_bg_stor_path + ')',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }
    }
  }

  function AppContents() {
    return (
      <>
        <Routes>
          <Route path="/" element={<AppRoot />} />
          {!isAuthentication && <Route path="/login" element={<Login />} />}
          {routers.map((item) =>
            !item.children ? (
              <Route
                key={item.key}
                path={item.path}
                element={item.element}
              ></Route>
            ) : (
              item.children.map(
                (child) =>
                  child.children &&
                  child.children.map((group) => (
                    <Route
                      key={group.key}
                      path={group.path}
                      element={group.element}
                    ></Route>
                  ))
              )
            )
          )}
        </Routes>
      </>
    )
  }

  function AppBody() {
    const layoutStyle = isAuthentication ? 'site-layout-content' : 'ant-login'
    return (
      <>
        <Row className={layoutStyle} style={loginImage()}>
          <Col span={24}>
            <AppContents />
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <Layout className="layout">
        {isAuthentication && <AppHeader />}
        <Content className="root-content">
          <AppBody />
        </Content>
        {isAuthentication && <Footer>Yeonho React Example @2022 by ken</Footer>}
      </Layout>
    </>
  )
}

export default App
