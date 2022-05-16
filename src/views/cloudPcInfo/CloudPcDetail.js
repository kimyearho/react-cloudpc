import React from 'react'
import { Col, Card, Row, Space, Divider, Typography, Button } from 'antd'
import ContainerPanel from '../../components/container/ContainerPanel'
import winPc from '../../assets/images/img_win_pc_on.png'

const CloudPcDetail = ({ meta }) => {
  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerPanel routeMeta={meta}>
            <Row>
              <Col span={8}>
                <Row>
                  <Col span={24}>
                    <div className="monitor">
                      <img width={180} src={winPc} alt="monitor" />
                    </div>
                    <div className="os">
                      <span>Windows 64bit</span>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                  <Col className="vpc-usage" span={18} offset={3}>
                    <Space split={<Divider type="vertical" />}>
                      <Typography.Text>
                        <b>최근 구동</b>
                      </Typography.Text>
                      <Typography.Text>2022-05-01 21:17:57</Typography.Text>
                    </Space>
                    <Space split={<Divider type="vertical" />}>
                      <Typography.Text>
                        <b>최근 접속</b>
                      </Typography.Text>
                      <Typography.Text>2022-05-01 21:17:57</Typography.Text>
                    </Space>
                    <Space split={<Divider type="vertical" />}>
                      <Typography.Text>
                        <b>사용 기간</b>
                      </Typography.Text>
                      <Typography.Text>2022-05-01 21:17:57</Typography.Text>
                    </Space>
                  </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Col span={18} offset={3}>
                    <Button type="primary" block>
                      Cloud PC 기간 연장
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Card title={<b>기본 정보</b>} bordered={false}></Card>
                  </Col>
                  <Col span={12}>
                    <Card title={<b>지원 정보</b>} bordered={false}></Card>
                  </Col>
                </Row>
                <Row></Row>
              </Col>
            </Row>
          </ContainerPanel>
        </Col>
      </Row>
    </>
  )
}

export default CloudPcDetail
