import React, { useEffect } from 'react'
import { Form, Input, DatePicker } from 'antd'
import moment from 'moment'
import CommonModal from '../../../components/modal/CommonModal'

const dateFormat = 'YYYY-MM-DD'

/**
 * @description
 * CloudPc 기간 연장 Contents slot
 *
 * @returns JSX
 */
export const PeriodExtensionModal = (props) => {
  const disabledDate = (current) => {
    let endDate = props.items.vm_vlid_end_dt
    return current && current < moment(endDate, 'YYYY-MM-DD')
  }
  useEffect(() => {}, [])
  return (
    <>
      <CommonModal {...props}>
        <Form.Item label="현재 사용기간" name="current_period">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="기간 연장 희망일" name="desired_date">
          <DatePicker disabledDate={disabledDate} format={dateFormat} />
        </Form.Item>
      </CommonModal>
    </>
  )
}
