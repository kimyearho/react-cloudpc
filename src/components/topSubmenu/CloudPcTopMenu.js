import React from 'react'
import { Space, Button, Row, Col } from 'antd'

const CloudPcTopMenu = () => {
  return (
    <>
      <Row>
        <Col>
          <Button className="width-150" type="primary" size="large">
            개인 디스크 관리
          </Button>
        </Col>
        <Col>
          <Button className="width-150" type="primary" size="large">
            PC 순서 조정
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default CloudPcTopMenu
