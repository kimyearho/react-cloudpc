import React from 'react'
import { Modal, Form, Input } from 'antd'

const aliasChangeModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  vm_als,
  vm_auth_id,
  vm_nm,
  form
}) => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  form.setFieldsValue({ vmName: vm_nm, currentAlias: vm_als })
  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="PC ID (권한 ID)" name="vmName">
          <Input disabled />
        </Form.Item>

        <Form.Item label="기존 별칭" name="currentAlias">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="새로운 별칭"
          name="newAlias"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default aliasChangeModal
