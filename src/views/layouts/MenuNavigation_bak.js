import React from 'react'
import { Row, Col, Menu } from 'antd'
import { routers } from '../../router/router'

class MenuNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: 'main',
      menuItems: routers
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
