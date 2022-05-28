import React, { useEffect, useState } from 'react'
import { Row, Col, Space, Table } from 'antd'
import { call_resource } from '../../../api/resource'
import { resourceFactory } from '../../../api/factory/system_factory'
import { recoveryModalOptions } from '../../../utils/modalOptions'
import { call_updateVmRecovery } from '../../../api/resource'
import { confirmBox } from '../../../components/messageBox/MessageBox'
import CommonWrapperModal from '../../../components/modal/CommonWrapperModal'
import { recoveryModalColumns } from '../recovery-helper'
import _ from 'lodash'

const RecoveryPcModal = ({
  isModalVisible,
  handelCancel,
  listLoading,
  listCallback
}) => {
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})
  const [vmList, setVmList] = useState([])

  //* 전체 가상 PC를 조회
  const fetchResource = async () => {
    try {
      const data = await call_resource()
      if (data.length > 0) {
        setVmList(resourceFactory(data))
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //* 라디오 버튼을 클릭했을때
  const rowSelection = {
    onChange: (_, selectedRows) => {
      if (selectedRows.length > 0) {
        setSelectedRow(selectedRows[0])
        recoveryModalOptions.buttonProps.disabled = false
      }
    },
    getCheckboxProps: (record) => ({
      tnt_mtd_cd_nm: record.tnt_mtd_cd_nm
    })
  }

  //* 오류 복구 실행
  const recoveryExcute = () => {
    if (_.isEmpty(selectedRow)) return
    const { vm_power_sts_cd } = selectedRow
    if (vm_power_sts_cd === 'V002ONC') {
      const confirmProps = {
        title: '알림',
        content: (
          <>가상 PC 전원이 켜져 있습니다. 강제로 종료 후 진행하시겠습니까?</>
        )
      }
      confirmBox(confirmProps, async () => {
        closeRecoveryModal()
        listLoading(true)
        try {
          const { vm_auth_id } = selectedRow
          const { status } = await call_updateVmRecovery(vm_auth_id)
          setTimeout(() => {
            if (status === 200) {
              listLoading(false)
              listCallback()
            }
          }, 10000)
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      })
    }
  }

  //* 오류 복구 팝업 닫기
  const closeRecoveryModal = () => {
    recoveryModalOptions.buttonProps.disabled = true
    handelCancel()
  }

  useEffect(() => {
    setLoading(true)
    fetchResource()
  }, [])

  return (
    <>
      <CommonWrapperModal
        isModalVisible={isModalVisible}
        modalOptions={recoveryModalOptions}
        handleOk={recoveryExcute}
        handleCancel={closeRecoveryModal}
      >
        <Row className="recovery-wrapper">
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Space className="grid-title">
                  <h3>
                    <b>Cloud PC 선택</b>
                  </h3>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  className="ant-table"
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection
                  }}
                  size="small"
                  columns={recoveryModalColumns}
                  dataSource={vmList}
                  pagination={false}
                  loading={loading}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </CommonWrapperModal>
    </>
  )
}

export default RecoveryPcModal
