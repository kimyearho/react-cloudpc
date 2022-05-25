import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import ContainerPanel from '../../components/container/ContainerPanel'

const SelfErrorRecovery = ({ meta }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerPanel loading={loading} routeMeta={meta}></ContainerPanel>
        </Col>
      </Row>
    </>
  )
}

export default SelfErrorRecovery
