import React, { useEffect } from 'react'
import { Alert, Modal, Form, Button, Divider } from 'antd'
import _ from 'lodash'

const CommonModal = ({
  isModalVisible,
  modalData,
  modalOptions,
  handleOk,
  handleCancel,
  children
}) => {
  const [form] = Form.useForm()
  const modalStyle = {
    divder: {
      margin: '30px 0'
    },
    footer: {
      marginTop: '10px',
      marginBottom: '0'
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
  const onFinish = async () => {
    const values = await form.validateFields()
    if (values) {
      values.origin = Object.assign({}, modalData)
      handleOk(values)
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      let formModels = {}
      for (const [key, value] of Object.entries(modalData)) {
        formModels[key] = value
      }
      form.setFieldsValue(formModels)
    }
  }, [form, isModalVisible, modalData])

  return (
    <>
      <Modal
        title={<b>{modalOptions.title}</b>}
        width={modalOptions.width}
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
          description={<b>{modalOptions.description}</b>}
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
          <Divider style={modalStyle.divder} />
          <Form.Item {...tailLayout} style={modalStyle.footer}>
            <Button
              className="width-100p"
              type="primary"
              size="large"
              htmlType="button"
              onClick={onFinish}
            >
              {modalOptions.buttonLabel.apply}
            </Button>
            <Button
              className="width-100p"
              size="large"
              htmlType="button"
              style={{ marginLeft: '10px' }}
              onClick={handleCancel}
            >
              {modalOptions.buttonLabel.cancel}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CommonModal