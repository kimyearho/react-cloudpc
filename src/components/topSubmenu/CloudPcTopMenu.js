import React from 'react'
import { Space, Button, Row, Col, Divider } from 'antd'
import { AppstoreAddOutlined, BorderVerticleOutlined } from '@ant-design/icons'

const CloudPcTopMenu = () => {
  const style = {
    rowRight: {
      float: 'right'
    },
    button: {
      width: '170px'
    },
    divider: {
      marginTop: '60px',
      borderBottom: '1px solid',
      marginBottom: '15px'
    }
  }
  return (
    <>
      <Row style={style.rowRight}>
        <Col>
          <Space size="large">
            <Button
              type="primary"
              style={style.button}
              size="large"
              icon={<AppstoreAddOutlined />}
            >
              개인 디스크 관리
            </Button>
            <Button
              style={style.button}
              size="large"
              icon={<BorderVerticleOutlined />}
            >
              PC 순서 조정
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider style={style.divider} />
    </>
  )
}

export default CloudPcTopMenu
