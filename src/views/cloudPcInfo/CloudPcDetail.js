/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { call_resource } from '../../api/resource'
import {
  userPcPeriodFactory,
  userPcInfoFactory
} from '../../api/factory/resource_factory'

import ContainerWrapper from '../../components/container/ContainerWrapper'
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

  /**
   * @description
   * 사용자에게 할당 된 전체 VM을 조회 합니다.
   */
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

  /**
   * @description
   * 별칭 변경시 목록을 갱신 합니다.
   */
  const aliasChangeCallback = async () => {
    await fetchResource()
  }

  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerWrapper loading={loading} routeMeta={meta}>
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
                      callback={aliasChangeCallback}
                    />
                  </Row>
                  <Row>
                    {/* 우측 하단 보안 정책 */}
                    <CloudPcSecurity secu_plcy_id={item.secu_plcy_id} />
                  </Row>
                </Col>
              </Row>
            ))}
          </ContainerWrapper>
        </Col>
      </Row>
    </>
  )
}

export default CloudPcDetail
