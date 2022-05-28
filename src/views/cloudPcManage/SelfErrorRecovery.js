/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Space, Table, Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { call_recoveryList } from '../../api/system'
import { recoveryFactory } from '../../api/factory/system_factory'

import ContainerWrapper from '../../components/container/ContainerWrapper'
import RecoveryPcModal from './components/RecoveryPcModal'
import { recoveryColumns } from './recovery-helper'

const SelfErrorRecovery = ({ meta }) => {
  const [loading, setLoading] = useState(true)
  const [recoveryList, setRecoveryList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { userAccount } = useSelector((state) => ({
    userAccount: state.user.userAccount
  }))

  //* 래퍼 props
  const wrapperProps = {
    routeMeta: meta,
    height: '700px'
  }

  //* 페이징 props
  const paginationProps = {
    position: ['bottomLeft'],
    total: recoveryList.length,
    pageSize: 5,
    defaultCurrent: 1
  }

  /**
   * @description
   * 최근 오류 복구 내역을 조회합니다.
   */
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
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecoveryList()
  }, [])

  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerWrapper {...wrapperProps}>
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
                  columns={recoveryColumns}
                  size="middle"
                  pagination={paginationProps}
                  dataSource={recoveryList}
                  loading={loading}
                />
              </Col>
            </Row>
            <Row className="fr">
              <Col span={24}>
                <Button
                  size="middle"
                  icon={<CheckOutlined />}
                  onClick={() => setIsModalVisible(true)}
                >
                  오류 복구 실행
                </Button>
              </Col>
            </Row>
          </ContainerWrapper>
        </Col>
      </Row>
      {isModalVisible ? (
        <RecoveryPcModal
          isModalVisible={isModalVisible}
          handelCancel={() => setIsModalVisible(false)}
          listLoading={setLoading}
          listCallback={fetchRecoveryList}
        />
      ) : null}
    </>
  )
}

export default SelfErrorRecovery
