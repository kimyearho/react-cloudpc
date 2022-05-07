import React from 'react'
import vmicon from '../../assets/images/vm_on.png'
import winPc from '../../assets/images/img_win_pc_on.png'
import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  Row,
  Col,
  Card,
  Collapse,
  Space,
  Menu,
  Divider,
  Progress
} from 'antd'
import { DesktopOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons'

const { Text } = Typography
const { Panel } = Collapse

function Home() {
  const dispatch = useDispatch()

  const menuItems = [
    {
      key: '1',
      icon: <DesktopOutlined />,
      label: 'SPICE'
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'RDP'
    },
    {
      key: '3',
      icon: (
        <Icon
          style={{ verticalAlign: 'text-bottom' }}
          component={() => <img src={vmicon} alt="language" />}
        />
      ),
      label: 'Cloud PC 전원'
    }
  ]

  const customHeader = () => {
    return (
      <>
        <Row>
          <Col span={2}>
            <div className="vm-number">01</div>
          </Col>
          <Col span={16}>
            <span className="vm-prefix">
              <Text>별칭 변경</Text>
            </span>
          </Col>
          <Col span={6}>
            <span className="vm-name">
              <Text>WD00-OEE-739023</Text>
            </span>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <Row className="control-wrapper">
        <Col offset={3} span={24}>
          <Space className="width-100" direction="vertical">
            <Collapse
              className="control-collapse"
              collapsible="header"
              expandIconPosition="right"
              defaultActiveKey={['1']}
            >
              <Panel className="control-panel" header={customHeader()} key="1">
                <Row>
                  <Col span={6}>
                    <Menu
                      className="control-menu"
                      mode="inline"
                      theme="dark"
                      items={menuItems}
                      selectable={false}
                    />
                  </Col>
                  <Col span={18}>
                    <Row>
                      <Col span={24}>
                        <Card
                          className="control-content"
                          title="Cloud PC 상세 정보"
                          bordered={false}
                        >
                          <Row>
                            <Col span={9}>
                              <div className="monitor">
                                <img width={180} src={winPc} alt="monitor" />
                              </div>
                              <div className="os">
                                <span>Windows 10 Enter</span>
                              </div>
                            </Col>
                            <Col span={1}>
                              <Divider
                                type="vertical"
                                className="control-content-divider"
                              />
                            </Col>
                            <Col span={14}>
                              <Row className="control-pc-status">
                                <Col span={4}>PC 상태</Col>
                                <Col span={2}>
                                  <Divider
                                    className="shotcut-divider"
                                    type="vertical"
                                  />
                                </Col>
                                <Col span={18}>
                                  <span className="fr">사용 가능</span>
                                </Col>
                              </Row>
                              <Row className="control-pc-usage">
                                <Col span={4}>PC 사용</Col>
                                <Col span={2}>
                                  <Divider
                                    className="shotcut-divider"
                                    type="vertical"
                                  />
                                </Col>
                              </Row>
                              <Row className="control-pc-useage-progress">
                                <Col span={24} style={{ padding: '20px 20px' }}>
                                  <Row gutter={20}>
                                    <Col span={6}>
                                      <span>
                                        CPU&nbsp;<small>(4core)</small>
                                      </span>
                                    </Col>
                                    <Col span={18}>
                                      <Progress
                                        className="useage-progress"
                                        strokeColor="#ed6d6d"
                                        percent={70}
                                        size="small"
                                        status="active"
                                      />
                                    </Col>
                                  </Row>
                                  <Row gutter={20}>
                                    <Col span={6}>
                                      <span>
                                        MEM&nbsp;<small>(8GB)</small>
                                      </span>
                                    </Col>
                                    <Col span={18}>
                                      <Progress
                                        className="useage-progress"
                                        strokeColor="#edd118"
                                        percent={52}
                                        size="small"
                                        status="active"
                                      />
                                    </Col>
                                  </Row>
                                  <Row gutter={20}>
                                    <Col span={6}>
                                      <span>
                                        HDD&nbsp;<small>(50GB)</small>
                                      </span>
                                    </Col>
                                    <Col span={18}>
                                      <Progress
                                        className="useage-progress"
                                        percent={25}
                                        size="small"
                                        status="active"
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Space>
        </Col>
      </Row>
    </>
  )
}

export default Home
