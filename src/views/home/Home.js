import React from 'react'
import logo from '../../assets/images/react_logo.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, resetCounter } from '../../store/modules/counter'
import { Button, Typography, Row, Popconfirm } from 'antd'
import { SET_LOGOUT } from '../../store/modules/user'
import { useNavigate } from 'react-router-dom'
import {
  PlusOutlined,
  MinusOutlined,
  RedoOutlined,
  DisconnectOutlined
} from '@ant-design/icons'
const { Text } = Typography

function Home() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const confirm = async () => {
    await dispatch(SET_LOGOUT())
    navigate('/login', { replace: true })
  }

  return (
    <>
      <img width={650} alt="logo" src={logo} />
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
        <Popconfirm
          title="로그아웃 하시겠습니까?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Button
            style={{ marginLeft: '20px' }}
            type="primary"
            key="console"
            icon={<DisconnectOutlined />}
          >
            Logout
          </Button>
        </Popconfirm>
      </Row>
    </>
  )
}

export default Home
