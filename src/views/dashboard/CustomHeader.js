import { Typography, Row, Col } from 'antd'
const { Text } = Typography

const customHeader = ({ vm_als, vm_nm, index }) => {
  return (
    <>
      <Row>
        <Col span={2}>
          <div className="vm-number">{index + 1}</div>
        </Col>
        <Col span={16}>
          <span className="vm-prefix">
            <Text>{!vm_als ? '─' : vm_als}</Text>
          </span>
        </Col>
        <Col span={6}>
          <span className="vm-name">
            <Text>
              <small>{vm_nm}</small>
            </Text>
          </span>
        </Col>
      </Row>
    </>
  )
}

export default customHeader
