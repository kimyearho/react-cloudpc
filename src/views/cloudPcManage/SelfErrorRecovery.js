import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Space, Table, Tag, Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { call_recoveryList } from '../../api/system'
import { recoveryFactory } from '../../api/factory/system_factory'

import ContainerPanel from '../../components/container/ContainerPanel'

const SelfErrorRecovery = ({ meta }) => {
  const [loading, setLoading] = useState(true)
  const [recoveryList, setRecoveryList] = useState([])
  const { userAccount } = useSelector((state) => ({
    userAccount: state.user.userAccount
  }))

  const columns = [
    {
      title: '실행 일자',
      dataIndex: 'act_tm',
      key: 'act_tm'
    },
    {
      title: 'Cloud PC 유형',
      dataIndex: 'tnt_mtd_cd_nm',
      key: 'tnt_mtd_cd_nm'
    },
    {
      title: '가상 PC 명',
      dataIndex: 'vm_nm',
      key: 'vm_nm'
    },
    {
      title: '복구 결과',
      key: 'act_cd_nm',
      dataIndex: 'act_cd_nm',
      render: (_, { act_cd, act_cd_nm }) => {
        const customColor = act_cd === 'Z007E1B' ? '#108ee9' : '#f50'
        return (
          <>
            <Tag color={customColor} key={act_cd_nm}>
              {act_cd_nm}
            </Tag>
          </>
        )
      }
    }
  ]

  useEffect(() => {
    fetchRecoveryList()
  }, [])

  const fetchRecoveryList = async () => {
    try {
      const params = {
        acct_id: userAccount.acct_id,
        usg_typ_cd: 'Z006E1',
        start_num: 0,
        row_count: 1000,
        sort: 'reg_ts',
        sort_type: 'desc'
      }
      const data = await call_recoveryList(params)
      if (data.length > 0) {
        setRecoveryList(recoveryFactory(data))
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerPanel loading={false} routeMeta={meta} height="700px">
            <Row>
              <Col span={24}>
                <Space className="grid-title">
                  <h3>
                    <b>최근 오류 복구 내역</b>
                  </h3>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  className="ant-table"
                  columns={columns}
                  dataSource={recoveryList}
                  pagination={false}
                  loading={loading}
                />
              </Col>
            </Row>
            <Row className="fr mt-30px">
              <Col span={24}>
                <Button size="middle" icon={<CheckOutlined />}>
                  오류 복구 실행
                </Button>
              </Col>
            </Row>
          </ContainerPanel>
        </Col>
      </Row>
    </>
  )
}

export default SelfErrorRecovery
