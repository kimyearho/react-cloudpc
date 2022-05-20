import React from 'react'
import { Col, Card, Row } from 'antd'

import iconCpu from '../../assets/images/security/ico_cpu.png'
import iconMem from '../../assets/images/security/ico_mem.png'
import iconDisk from '../../assets/images/security/ico_hdd.png'
import iconAddr from '../../assets/images/security/ico_ip.png'

const CloudPcResource = ({
  tnt_mtd_cd_nm,
  vm_nm,
  vm_als,
  vcpu_cnt,
  vmm_capa,
  vhd_capa,
  vm_ip
}) => {
  const style = {
    specTitle: {
      paddingLeft: '15px'
    }
  }

  return (
    <>
      <Col span={12}>
        <Card className="vpc-info" title={<b>기본 정보</b>} bordered={false}>
          <Row>
            <Col span={10}>가상 PC 유형</Col>
            <Col span={12}>{tnt_mtd_cd_nm}</Col>
          </Row>
          <Row>
            <Col span={10}>가상 PC ID</Col>
            <Col span={12}>{vm_nm}</Col>
          </Row>
          <Row>
            <Col span={10}>가상 PC 별칭</Col>
            <Col span={12}>{!vm_als ? '-' : vm_als}</Col>
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
            <Col span={12}>{vcpu_cnt} Core</Col>
          </Row>
          <Row>
            <Col span={10}>
              <img src={iconMem} alt="mem" />
              <span style={style.specTitle}>Memory</span>
            </Col>
            <Col span={12}>{vmm_capa} MB</Col>
          </Row>
          <Row>
            <Col span={10}>
              <img src={iconDisk} alt="disk" />
              <span style={style.specTitle}>Disk</span>
            </Col>
            <Col span={12}>{vhd_capa} GB</Col>
          </Row>
          <Row>
            <Col span={10}>
              <img src={iconAddr} alt="ip" />
              <span style={style.specTitle}>IP</span>
            </Col>
            <Col span={12}>{vm_ip}</Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}

export default CloudPcResource
