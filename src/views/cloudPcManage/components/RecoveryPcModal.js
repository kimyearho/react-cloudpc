import React, { useEffect, useState } from 'react'
import { Row, Col, Space, Table } from 'antd'
import { call_resource } from '../../../api/resource'
import { resourceFactory } from '../../../api/factory/system_factory'
import { recoveryModalOptions } from '../../../utils/modalOptions'
import CommonWrapperModal from '../../../components/modal/CommonWrapperModal'

const RecoveryPcModal = ({ isModalVisible, handelCancel }) => {
  const [loading, setLoading] = useState(false)
  const [vmList, setVmList] = useState([])
  const columns = [
    {
      title: 'Cloud PC 유형',
      dataIndex: 'tnt_mtd_cd_nm'
    },
    {
      title: 'Cloud PC ID',
      dataIndex: 'vm_nm'
    },
    {
      title: 'Cloud PC 별칭',
      dataIndex: 'vm_als'
    }
  ]

  useEffect(() => {
    fetchResource()
  }, [])

  const fetchResource = async () => {
    try {
      const data = await call_resource()
      if (data.length > 0) {
        setVmList(resourceFactory(data))
      }
    } catch (error) {
      console.error(error)
    }
  }

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
        modalOptions={recoveryModalOptions}
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
                    type: 'checkbox',
                    ...rowSelection
                  }}
                  size="small"
                  columns={columns}
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
