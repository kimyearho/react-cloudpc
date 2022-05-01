import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'
import { Header, Content, Footer } from 'antd/lib/layout/layout'
import { routers } from '../router/router'
import MenuNavigation from './layouts/MenuNavigation'

class App extends React.Component {
  render() {
    return (
      <>
        <Layout className="layout">
          <Header>
            <MenuNavigation />
          </Header>
          <Content className="root-content">
            <Row className="site-layout-content">
              <Col span={24}>
                <Routes>
                  <Route path="/" element={<Navigate replace to="/main" />} />
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
              </Col>
            </Row>
          </Content>
          <Footer>Yeonho React Example @2022 by ken</Footer>
        </Layout>
      </>
    )
  }
}

export default App
