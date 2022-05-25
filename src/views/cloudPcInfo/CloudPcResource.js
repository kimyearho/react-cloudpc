import React, { useState } from 'react'
import { Col, Card, Row, Button, message } from 'antd'
import { call_updateVmAlias } from '../../api/resource'
import { AliasChangeMdoal } from '../dashboard/DashboardModal'

import iconCpu from '../../assets/images/security/ico_cpu.png'
import iconMem from '../../assets/images/security/ico_mem.png'
import iconDisk from '../../assets/images/security/ico_hdd.png'
import iconAddr from '../../assets/images/security/ico_ip.png'

const CloudPcResource = ({
  callback,
  tnt_mtd_cd_nm,
  vm_nm,
  vm_als,
  vm_auth_id,
  vcpu_cnt,
  vmm_capa,
  vhd_capa,
  vm_ip
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [alias, setAlias] = useState(null)
  const modalStaticOptions = {
    width: 630,
    title: '가상 PC 별칭 설정',
    description:
      '가상 PC 별로 별칭을 설정하면 목록에서 가상 PC를 쉽고 빠르게 구분할 수 있습니다.',
    buttonLabel: {
      apply: '변경',
      cancel: '취소'
    },
    buttonProps: {
      disabled: false
    }
  }

  const style = {
    specTitle: {
      paddingLeft: '15px'
    }
  }

  /**
   * @description
   * 별칭 변경을 클릭했을때 실행 된다.
   * 모달의 데이터를 설정하고 모달을 오픈한다.
   *
   * @param {Object} data - {vm_als: string, vm_auth_id: string, vm_nm: string}
   */
  const handelShowModal = () => {
    const modalData = {
      vm_als: vm_als,
      vm_auth_id: vm_auth_id,
      vm_nm: vm_nm
    }
    setAlias(modalData)
    setIsModalVisible(true)
  }

  /**
   * @description
   * Modal submit이 발생했을 때 이벤트 처리를 위한 callback을 받는다.
   *
   * @param {Object} data - {newAlias: string}
   */
  const handelModalCallback = async (data) => {
    try {
      const model = { newAlias: data.newAlias, vmAuthId: alias.vm_auth_id }
      const { status } = await call_updateVmAlias(model)
      if (status === 200) {
        message.success('별칭이 변경 되었습니다.')
        setIsModalVisible(false)
        callback()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Col span={12}>
        <Card className="vpc-info" title={<b>기본 정보</b>} bordered={false}>
          <Row>
            <Col span={10}>가상 PC 유형</Col>
            <Col span={12}>
              <small>{tnt_mtd_cd_nm}</small>
            </Col>
          </Row>
          <Row>
            <Col span={10}>가상 PC ID</Col>
            <Col span={12}>
              <small>{vm_nm}</small>
            </Col>
          </Row>
          <Row>
            <Col span={10}>가상 PC 별칭</Col>
            <Col span={8} className="word-overflow">
              <small>{!vm_als ? '-' : vm_als}</small>
            </Col>
            <Col span={4} className="alias-change-btn">
              <Button type="link" onClick={handelShowModal}>
                <small>▶변경</small>
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card className="vpc-info" title={<b>지원 정보</b>} bordered={false}>
          <Row>
            <Col span={10}>
              <img src={iconCpu} alt="cpu" />
              <span style={style.specTitle}>CPU</span>
            </Col>
            <Col span={12}>
              <small>{vcpu_cnt} Core</small>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <img src={iconMem} alt="mem" />
              <span style={style.specTitle}>Memory</span>
            </Col>
            <Col span={12}>
              <small>{vmm_capa} MB</small>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <img src={iconDisk} alt="disk" />
              <span style={style.specTitle}>Disk</span>
            </Col>
            <Col span={12}>
              <small>{vhd_capa} GB</small>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <img src={iconAddr} alt="ip" />
              <span style={style.specTitle}>IP</span>
            </Col>
            <Col span={12}>
              <small>{vm_ip}</small>
            </Col>
          </Row>
        </Card>
      </Col>
      {isModalVisible ? (
        <AliasChangeMdoal
          isModalVisible={isModalVisible}
          handleOk={handelModalCallback}
          handleCancel={() => setIsModalVisible(false)}
          modalOptions={modalStaticOptions}
          modalData={alias}
        />
      ) : null}
    </>
  )
}

export default CloudPcResource
