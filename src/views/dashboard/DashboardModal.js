import React from 'react'
import { Form, Input } from 'antd'
import CommonModal from '../../components/modal/CommonModal'

export const AliasChangeMdoal = (props) => {
  return (
    <CommonModal {...props}>
      <Form.Item label="PC ID (권한 ID)" name="vm_nm">
        <Input disabled />
      </Form.Item>

      <Form.Item label="기존 별칭" name="vm_als">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="새로운 별칭"
        name="newAlias"
        rules={[{ required: true, message: '새 별칭을 입력하세요.' }]}
      >
        <Input />
      </Form.Item>
    </CommonModal>
  )
}
