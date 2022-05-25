/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { call_resource } from '../../api/resource'
import {
  userPcPeriodFactory,
  userPcInfoFactory
} from '../../api/factory/resource_factory'

import ContainerPanel from '../../components/container/ContainerPanel'
import CloudPcPeriod from './CloudPcPeriod'
import CloudPcResource from './CloudPcResource'
import CloudPcSecurity from './CloudPcSecurity'

const CloudPcDetail = ({ meta }) => {
  const [cloudPcList, setCloudPcList] = useState([])
  const [loading, setLoading] = useState(true)
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
      if (data.length > 0) {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const aliasChangeCallbak = async () => {
    await fetchResource()
  }

  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerPanel loading={loading} routeMeta={meta}>
            {cloudPcList.map((item) => (
              <Row style={style.divRow} key={item.vm_id}>
                <Col span={8}>
                  {/* 좌측 CloudPc 정보 */}
                  <CloudPcPeriod {...userPcPeriodFactory(item)} />
                </Col>
                <Col span={16}>
                  <Row>
                    {/* 우측 상단 기본 정보 & 지원 정보 */}
                    <CloudPcResource
                      {...userPcInfoFactory(item)}
                      callback={aliasChangeCallbak}
                    />
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
