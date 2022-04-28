import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'
import { Header, Content, Footer } from 'antd/lib/layout/layout'
import MenuNavigation from './layouts/MenuNavigation'

class App extends React.Component {
  render() {
    const { state } = new MenuNavigation()
    const routeItem = state.menuItems.map((item) => (
      <Route key={item.key} path={item.key} element={item.element}></Route>
    ))

    return (
      <>
        <Layout className="layout">
          <Header>
            <MenuNavigation />
          </Header>
          <Content className="root-content">
            <Row className="site-layout-content">
              <Col span={24}>
                <Routes>{routeItem}</Routes>
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
