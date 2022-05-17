import React from 'react'
import { Col, Card, Row, Space, Divider, Typography, Tabs, Button } from 'antd'
import ContainerPanel from '../../components/container/ContainerPanel'

import winPc from '../../assets/images/img_win_pc_on.png'
import iconCpu from '../../assets/images/security/ico_cpu.png'
import iconMem from '../../assets/images/security/ico_mem.png'
import iconDisk from '../../assets/images/security/ico_hdd.png'
import iconAddr from '../../assets/images/security/ico_ip.png'

import clipboardOn from '../../assets/images/security/ico_ctr_01_on.png'
import fileDragOn from '../../assets/images/security/ico_ctr_02_on.png'
import folderShareOn from '../../assets/images/security/ico_ctr_03_on.png'
import usbConnectOn from '../../assets/images/security/ico_ctr_04_on.png'
import urlRedrOn from '../../assets/images/security/ico_ctr_05_on.png'
import printConnectOn from '../../assets/images/security/ico_ctr_06_on.png'
import multiDisplayOn from '../../assets/images/security/ico_ctr_07_on.png'
import scrCaptureOff from '../../assets/images/security/ico_ctr_08.png'

const { TabPane } = Tabs
const CloudPcDetail = ({ meta }) => {
  const style = {
    secuRow: {
      paddingBottom: '20px'
    },
    secuIcon: {
      paddingTop: '7px',
      paddingLeft: '3px'
    },
    secuItemTitle: {
      fontWeight: 700
    },
    specTitle: {
      paddingLeft: '15px'
    }
  }

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
                    <Card
                      className="vpc-info"
                      title={<b>기본 정보</b>}
                      bordered={false}
                    >
                      <Row>
                        <Col span={10}>가상 PC 유형</Col>
                        <Col span={12}>전용 PC</Col>
                      </Row>
                      <Row>
                        <Col span={10}>가상 PC ID</Col>
                        <Col span={12}>WD00-0EE-012471</Col>
                      </Row>
                      <Row>
                        <Col span={10}>가상 PC 별칭</Col>
                        <Col span={12}>-</Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      className="vpc-info"
                      title={<b>지원 정보</b>}
                      bordered={false}
                    >
                      <Row>
                        <Col span={10}>
                          <img src={iconCpu} alt="cpu" />
                          <span style={style.specTitle}>CPU</span>
                        </Col>
                        <Col span={12}>4 Core</Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          <img src={iconMem} alt="mem" />
                          <span style={style.specTitle}>Memory</span>
                        </Col>
                        <Col span={12}>32 GB</Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          <img src={iconDisk} alt="disk" />
                          <span style={style.specTitle}>Disk</span>
                        </Col>
                        <Col span={12}>500 GB</Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          <img src={iconAddr} alt="ip" />
                          <span style={style.specTitle}>IP</span>
                        </Col>
                        <Col span={12}>192.168.0.1</Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Tabs defaultActiveKey="1" style={{ marginLeft: '22px' }}>
                      <TabPane tab="기본망 보안 정책" key="1">
                        <Row className="mt-10p">
                          <Col span={12}>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={clipboardOn}
                                  alt="clipboardOn"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    클립보드 공유
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>양방향</Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={fileDragOn}
                                  alt="fileDragOn"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    파일 Drag & Drop 공유
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>단방향(로컬 → 가상)</Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={folderShareOn}
                                  alt="folderShareOn"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    로컬 PC 폴더 공유
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>읽기 ┼ 쓰기</Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={usbConnectOn}
                                  alt="folderShareOn"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    로컬 PC USB 연결
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>읽기 ┼ 쓰기</Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                          {/* ================================= */}
                          <Col span={12}>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={urlRedrOn}
                                  alt="urlRedrOn"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    URL Redirection
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>허용</Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={printConnectOn}
                                  alt="printConnectOn"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    로컬 PC 프린터 연결
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>허용</Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={multiDisplayOn}
                                  alt="multiDisplayOn"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    다중 디스플레이
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>허용</Col>
                                </Row>
                              </Col>
                            </Row>
                            <Row style={style.secuRow}>
                              <Col span={4}>
                                <img
                                  src={scrCaptureOff}
                                  alt="scrCaptureOff"
                                  style={style.secuIcon}
                                />
                              </Col>
                              <Col span={12}>
                                <Row>
                                  <Col style={style.secuItemTitle} span={24}>
                                    화면 캡쳐 여부
                                  </Col>
                                </Row>
                                <Row>
                                  <Col span={24}>비허용</Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tab="예외망 보안 정책" key="2">
                        Content of Tab Pane 2
                      </TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ContainerPanel>
        </Col>
      </Row>
    </>
  )
}

export default CloudPcDetail
