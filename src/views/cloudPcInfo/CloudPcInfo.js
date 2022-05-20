import React from 'react'
import { Col, Row, Space, Divider, Typography, Button } from 'antd'
import winPc from '../../assets/images/img_win_pc_on.png'

const CloudPcInfo = ({
  vm_on_ctrl_tm,
  usr_vm_ctrl_tm,
  vm_vlid_stt_dt,
  vm_vlid_end_dt,
  os_typ_cd_nm
}) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="monitor">
            <img width={180} src={winPc} alt="monitor" />
          </div>
          <div className="os">
            <span>{os_typ_cd_nm}</span>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '40px' }}>
        <Col className="vpc-usage" span={20} offset={2}>
          <Space split={<Divider type="vertical" />}>
            <Typography.Text>
              <b>최근 구동</b>
            </Typography.Text>
            <Typography.Text>{vm_on_ctrl_tm}</Typography.Text>
          </Space>
          <Space split={<Divider type="vertical" />}>
            <Typography.Text>
              <b>최근 접속</b>
            </Typography.Text>
            <Typography.Text>{usr_vm_ctrl_tm}</Typography.Text>
          </Space>
          <Space split={<Divider type="vertical" />}>
            <Typography.Text>
              <b>사용 기간</b>
            </Typography.Text>
            <Typography.Text>
              {vm_vlid_stt_dt} ~ {vm_vlid_end_dt}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col span={20} offset={2}>
          <Button type="primary" block>
            Cloud PC 기간 연장
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default CloudPcInfo
