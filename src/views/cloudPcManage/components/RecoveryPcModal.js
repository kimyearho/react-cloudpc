import React, { useState } from 'react'
import { Row, Col, Space, Table } from 'antd'
import CommonWrapperModal from '../../../components/modal/CommonWrapperModal'

const RecoveryPcModal = ({ isModalVisible, handelCancel }) => {
  const [loading, setLoading] = useState(false)

  const modalStaticOptions = {
    width: 550,
    className: 'recovery-modal',
    title: '오류 복구 실행',
    alertTitle: '중요',
    description: (
      <>
        오류 복구를 실행한 Cloud PC의 모든 데이터는 초기화 됩니다.
        <br />
        오류 복구중인 가상 PC는 오류 복구 실행을 할 수 없습니다.
      </>
    ),
    buttonLabel: {
      apply: '실행',
      cancel: '취소'
    },
    buttonProps: {
      disabled: false
    }
  }

  const columns = [
    {
      title: 'Cloud PC 유형',
      dataIndex: 'tnt_mtd_cd_nm',
      key: 'tnt_mtd_cd_nm'
    },
    {
      title: 'Cloud PC ID',
      dataIndex: 'vm_nm',
      key: 'vm_nm'
    },
    {
      title: 'Cloud PC 별칭',
      dataIndex: 'vm_als',
      key: 'vm_als'
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: (record) => ({
      tnt_mtd_cd_nm: record.tnt_mtd_cd_nm
    })
  }

  const recoveryExcute = async () => {
    console.log('recoveryExcute !')
  }

  const closeModal = () => {
    handelCancel()
  }

  return (
    <>
      <CommonWrapperModal
        isModalVisible={isModalVisible}
        modalData={{ a: '1', b: '2' }}
        modalOptions={modalStaticOptions}
        handleOk={recoveryExcute}
        handleCancel={closeModal}
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
                    ...rowSelection
                  }}
                  size="small"
                  columns={columns}
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
