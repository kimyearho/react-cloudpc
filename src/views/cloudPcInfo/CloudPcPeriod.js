import moment from 'moment'
import React, { useState } from 'react'
import { Col, Row, Space, Divider, Typography, Button } from 'antd'
import { PeriodExtensionModal } from './components/ResourceModal'
import { userPcPeriodModalOptions } from '../../utils/modalOptions'
import winPc from '../../assets/images/img_win_pc_on.png'

function CloudPcPeriod({
  acct_conn_id,
  acct_id,
  usr_vm_ctrl_tm,
  os_typ_cd_nm,
  vm_id,
  vm_on_ctrl_tm,
  vm_vlid_stt_dt,
  vm_vlid_end_dt
}) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalData, setModalData] = useState({})

  const showPcPeriod = () => {
    const modalModel = {
      acct_id: acct_id,
      acct_conn_id: acct_conn_id,
      current_period: vm_vlid_stt_dt + ' ~ ' + vm_vlid_end_dt,
      desired_date: moment(vm_vlid_end_dt, 'YYYY-MM-DD').add(1, 'day'),
      vm_vlid_stt_dt: vm_vlid_stt_dt,
      vm_vlid_end_dt: vm_vlid_end_dt,
      vm_id: vm_id
    }
    setModalData(modalModel)
    setIsModalVisible(true)
  }

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
          <Button type="primary" block onClick={showPcPeriod}>
            Cloud PC 기간 연장
          </Button>
        </Col>
      </Row>
      {isModalVisible ? (
        <PeriodExtensionModal
          isModalVisible={isModalVisible}
          modalData={modalData}
          modalOptions={userPcPeriodModalOptions}
          handleCancel={() => setIsModalVisible(false)}
        />
      ) : null}
    </>
  )
}

export default CloudPcPeriod
