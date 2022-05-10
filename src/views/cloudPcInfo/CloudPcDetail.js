import React from 'react'
import { Col, Row } from 'antd'
import ContainerPanel from '../../components/container/ContainerPanel'

const CloudPcDetail = ({ meta }) => {
  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerPanel routeMeta={meta}>
            <h1>레이아웃 구성 중...</h1>
          </ContainerPanel>
        </Col>
      </Row>
    </>
  )
}

export default CloudPcDetail
