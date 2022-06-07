/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Alert, Modal, Form, Button, Divider } from 'antd'
import _ from 'lodash'

/**
 * @description
 * 래퍼 팝업 컴포넌트 입니다.
 * 기본적으로 폼을 가지는 팝업 컴포넌트로써, slot 형태로 사용할 수 있습니다.
 * modal props를 사용하여 하나의 컴포넌트로 다양한 팝업을 개발 가능 합니다.
 * 전용 props는 아래 정보를 참고 해주세요.
 *
 * @param {...props} {
 *                      isModalVisible: true / false   | 팝업을 표시할지 여부 | (default: false)
 *                      modalData: {object}            | 팝업 Form에 bind될 데이터 모음
 *                      modalOptions: {object}         | 팝업 옵션
 *                      handleOk: function             | 팝업에서 submit 이벤트가 발생시
 *                      handleCancel: function         | 팝업을 닫을 때 사용
 *                      children: JSX
 *                   }
 * @returns
 */
const CommonModal = ({
  isModalVisible,
  modalData,
  modalOptions,
  handleOk,
  handleCancel,
  children
}) => {
  const [form] = Form.useForm()
  const templateType = modalOptions.templateType
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
    if (templateType === 'form') {
      const values = await form.validateFields()
      if (values) {
        values.origin = Object.assign({}, modalData)
        handleOk(values)
      }
    } else {
      handleOk()
    }
  }

  useEffect(() => {
    if (isModalVisible && templateType === 'form') {
      let formModels = {}
      for (const [key, value] of Object.entries(modalData)) {
        formModels[key] = value
      }
      form.setFieldsValue(formModels)
    }
  }, [form, isModalVisible, modalData, templateType])

  return (
    <>
      <Modal
        className={modalOptions.className}
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
          message={modalOptions.alertTitle}
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
              disabled={
                modalOptions.buttonProps.disabled &&
                modalOptions.buttonProps.disabled
              }
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
