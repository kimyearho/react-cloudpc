import React, { useEffect, useState } from 'react'
import { Col, Row, Tabs } from 'antd'
import _ from 'lodash'

import clipboardOn from '../../assets/images/security/ico_ctr_01_on.png'
import fileDragOn from '../../assets/images/security/ico_ctr_02_on.png'
import folderShareOn from '../../assets/images/security/ico_ctr_03_on.png'
import usbConnectOn from '../../assets/images/security/ico_ctr_04_on.png'
import urlRedrOn from '../../assets/images/security/ico_ctr_05_on.png'
import printConnectOn from '../../assets/images/security/ico_ctr_06_on.png'
import multiDisplayOn from '../../assets/images/security/ico_ctr_07_on.png'
import scrCaptureOff from '../../assets/images/security/ico_ctr_08.png'

import { call_securityPolicy } from '../../api/security'

const { TabPane } = Tabs

const CloudPcSecurity = (props) => {
  const [securityPolicy, setSecurityPolicy] = useState({})

  const style = {
    secuRow: {
      paddingBottom: '25px'
    },
    secuIcon: {
      paddingTop: '7px',
      paddingLeft: '3px'
    },
    secuItemTitle: {
      fontWeight: 700
    }
  }

  useEffect(() => {
    fetchSecurityPolicy(props.secu_plcy_id)
  }, [props.secu_plcy_id])

  const fetchSecurityPolicy = async (secu_plcy_id) => {
    try {
      const data = await call_securityPolicy(secu_plcy_id)
      if (!_.isEmpty(data)) {
        const { pcly_cert } = data
        setSecurityPolicy(pcly_cert[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
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
                      <Col span={24}>{securityPolicy.clb_shar_auth_cd_nm}</Col>
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
                      <Col span={24}>{securityPolicy.drag_drop_auth_cd_nm}</Col>
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
                      <Col span={24}>{securityPolicy.fold_shar_auth_cd_nm}</Col>
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
                      <Col span={24}>{securityPolicy.usb_conn_auth_cd_nm}</Col>
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
                      <Col span={24}>{securityPolicy.url_rdrt_auth_cd_nm}</Col>
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
                      <Col span={24}>{securityPolicy.prt_conn_auth_cd_nm}</Col>
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
                      <Col span={24}>{securityPolicy.mult_mtor_auth_cd_nm}</Col>
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
                      <Col span={24}>
                        {securityPolicy.scr_capture_yn === 'Y'
                          ? '허용'
                          : '비허용'}
                      </Col>
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
    </>
  )
}

export default CloudPcSecurity
