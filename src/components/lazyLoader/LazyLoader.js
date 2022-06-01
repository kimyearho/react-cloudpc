import React from 'react'
import { Spin, Row, Col } from 'antd'

const LazyLoader = () => {
  return (
    <>
      <Row className="lazy-loader">
        <Col span={24}>
          <Spin size="large" />
        </Col>
      </Row>
    </>
  )
}

export default LazyLoader
