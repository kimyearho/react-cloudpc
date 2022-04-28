import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Menu } from 'antd'

import Home from '../home/Home'
import About from '../about/About'
import Dashboard from '../dashboard/Dashboard'
import List from '../list/List'

class MenuNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: 'main',
      menuItems: [
        {
          label: <Link to="/main">Main</Link>,
          element: <Home />,
          key: 'main',
          to: '/main'
        },
        {
          label: <Link to="/about">About</Link>,
          element: <About name="Ken" />,
          key: 'about',
          to: '/about'
        },
        {
          label: <Link to="/dashboard">Dashboard</Link>,
          element: <Dashboard />,
          key: 'dashboard',
          to: '/dashboard'
        },
        {
          label: <Link to="/list">List</Link>,
          element: <List />,
          key: 'list',
          to: '/list'
        }
      ]
    }
  }

  setCurrentKey = (event) => {
    this.setState({
      currentKey: event.key
    })
  }

  render() {
    return (
      <>
        <Row>
          <Col span={24}>
            <Menu
              mode="horizontal"
              selectedKeys={this.state.currentKey}
              items={this.state.menuItems}
              onClick={this.setCurrentKey}
            />
          </Col>
        </Row>
      </>
    )
  }
}

export default MenuNavigation
