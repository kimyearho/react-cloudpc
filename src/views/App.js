import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import { Header, Content, Footer } from 'antd/lib/layout/layout'
import { routers } from '../router/router'
import { staticPublic } from '../store/actions/user_action'
import Login from '../views/login/Login'
import MenuNavigation from './layouts/MenuNavigation'

function App() {
  const type = 'user'
  const dispatch = useDispatch()
  const { loading, isAuthentication, meta } = useSelector((state) => ({
    loading: state.app.loading,
    isAuthentication: state.user.userInfo.isAuthentication,
    meta: state.user.portalPublic
  }))

  useEffect(() => {
    dispatch(staticPublic(type))
  }, [type, dispatch])

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
    } else {
      return {
        marginTop: '40px'
      }
    }
  }

  function portalImage() {
    if (meta && isAuthentication) {
      return {
        backgroundImage: 'url(' + meta['portal'].ptal_bg_stor_path + ')',
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
    const layoutStyle = isAuthentication
      ? 'ant-pro-grid-content wide site-layout-content'
      : 'ant-login'
    return (
      <>
        <div className={layoutStyle} style={loginImage()}>
          <AppContents />
        </div>
      </>
    )
  }

  const contentsStyle = isAuthentication ? 'auth-content' : 'not-auth-content'

  function AppLoader() {
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
          <AppBody />
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

export default App
