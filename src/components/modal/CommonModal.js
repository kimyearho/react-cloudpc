import React, { useEffect } from 'react'
import { Alert, Modal, Form, Button } from 'antd'
import _ from 'lodash'

const CommonModal = ({
  isModalVisible,
  items,
  message,
  handleOk,
  handleCancel,
  children
}) => {
  const [form] = Form.useForm()
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
  const onFinish = async () => {
    const values = await form.validateFields()
    if (values) {
      values.origin = Object.assign({}, items)
      handleOk(values)
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      let formModels = {}
      for (const [key, value] of Object.entries(items)) {
        formModels[key] = value
      }
      form.setFieldsValue(formModels)
    }
  }, [form, isModalVisible, items])

  return (
    <>
      <Modal
        title={<b>{message.title}</b>}
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
          description={<b>{message.description}</b>}
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
          {children}
          <Form.Item {...tailLayout} style={{ marginTop: '10px' }}>
            <Button
              className="width-100p"
              type="primary"
              size="large"
              htmlType="button"
              onClick={onFinish}
            >
              {message.button.apply}
            </Button>
            <Button
              className="width-100p"
              size="large"
              htmlType="button"
              style={{ marginLeft: '10px' }}
              onClick={handleCancel}
            >
              {message.button.cancel}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CommonModal
