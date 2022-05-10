import React, { useEffect } from 'react'
import { Alert, Modal, Form, Input, Button } from 'antd'

const AliasChangeModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  vm_als,
  vm_auth_id,
  vm_nm
}) => {
  const [form] = Form.useForm()

  const onFinish = async () => {
    const values = await form.validateFields()
    if (values) {
      values.vmAuthId = vm_auth_id
      handleOk(values)
    }
  }

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  }
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue({
        vmName: vm_nm,
        currentAlias: vm_als
      })
    }
  }, [form, isModalVisible, vm_nm, vm_als])

  return (
    <Modal
      title={<b>가상 PC 별칭 설정</b>}
      centered
      forceRender
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      visible={isModalVisible}
      onCancel={handleCancel}
    >
      <Alert
        className="mb-20p"
        description={
          <b>
            가상 PC 별로 별칭을 설정하면 목록에서 가상 PC를 쉽고 빠르게 구분할
            수 있습니다.
          </b>
        }
        type="info"
        showIcon
      />
      <Form
        {...layout}
        form={form}
        name="basic"
        preserve={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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
          rules={[{ required: true, message: '새 별칭을 입력하세요.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout} style={{ marginTop: '10px' }}>
          <Button
            className="width-100p"
            type="primary"
            size="large"
            htmlType="button"
            onClick={onFinish}
          >
            변경
          </Button>
          <Button
            className="width-100p"
            size="large"
            htmlType="button"
            style={{ marginLeft: '10px' }}
            onClick={handleCancel}
          >
            취소
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AliasChangeModal
