import React from 'react'
import logo from '../../assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, resetCounter } from '../../store/modules/counter'
import { Button, Typography, Row, Col, Card } from 'antd'
import { PlusOutlined, MinusOutlined, RedoOutlined } from '@ant-design/icons'

const { Text } = Typography

function Home() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <Row>
        <Col span={24}>
          <Card>
            <img
              src={logo}
              alt="logo"
              style={{ width: '100%', height: '450px' }}
            />
            <h1 style={{ marginTop: '10px' }}>
              <Text type="secondary" style={{ fontSize: '50px' }}>
                Welcome to the React Redux!
              </Text>
            </h1>
            <Text type="secondary">
              <h2>You clicked {count} count!</h2>
            </Text>
            <Row style={{ marginTop: '40px' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => dispatch(increment())}
              >
                증가
              </Button>
              <Button
                style={{ marginLeft: '20px' }}
                type="primary"
                icon={<MinusOutlined />}
                danger
                onClick={() => dispatch(decrement())}
              >
                감소
              </Button>
              <Button
                style={{ marginLeft: '20px' }}
                icon={<RedoOutlined />}
                onClick={() => dispatch(resetCounter())}
              >
                초기화
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Home
