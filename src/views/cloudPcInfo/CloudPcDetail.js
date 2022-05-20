import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import ContainerPanel from '../../components/container/ContainerPanel'

import CloudPcInfo from './CloudPcInfo'
import CloudPcResource from './CloudPcResource'
import CloudPcSecurity from './CloudPcSecurity'

import { call_resource } from '../../api/resource'

const CloudPcDetail = ({ meta }) => {
  const [cloudPcList, setCloudPcList] = useState([])
  const style = {
    divRow: {
      borderBottom: '1px solid #ddd',
      marginBottom: '25px'
    }
  }

  useEffect(() => {
    fetchResource()
  }, [])

  const fetchResource = async () => {
    try {
      const data = await call_resource()
      setCloudPcList(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerPanel routeMeta={meta}>
            {cloudPcList.map((item) => (
              <Row style={style.divRow} key={item.vm_id}>
                <Col span={8}>
                  {/* 좌측 CloudPc 정보 */}
                  <CloudPcInfo {...item} />
                </Col>
                <Col span={16}>
                  <Row>
                    {/* 우측 상단 기본 정보 & 지원 정보 */}
                    <CloudPcResource {...item} />
                  </Row>
                  <Row>
                    {/* 우측 하단 보안 정책 */}
                    <CloudPcSecurity secu_plcy_id={item.secu_plcy_id} />
                  </Row>
                </Col>
              </Row>
            ))}
          </ContainerPanel>
        </Col>
      </Row>
    </>
  )
}

export default CloudPcDetail
