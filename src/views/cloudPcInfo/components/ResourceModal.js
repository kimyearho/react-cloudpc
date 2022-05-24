/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker, message } from 'antd'
import {
  call_userPcPeriodHistory,
  call_userPcPeriodRequest,
  call_userPcPeriodRequestCancel
} from '../../../api/user'
import CommonModal from '../../../components/modal/CommonModal'

const dateFormat = 'YYYY-MM-DD'

/**
 * @description
 * CloudPc 기간 연장 Contents slot
 *
 * @returns JSX
 */
export const PeriodExtensionModal = (rootProps) => {
  const [requestPeriod, setRequestPeriod] = useState({})
  const [parentProps, setParentProps] = useState(rootProps)

  useEffect(() => {
    fetchUserPeriodRequestHistory()
  }, [])

  const disabledDate = (current) => {
    let endDate = parentProps.items.vm_vlid_end_dt
    return current && current < moment(endDate, 'YYYY-MM-DD')
  }

  const fetchUserPeriodRequestHistory = async () => {
    try {
      const queryParams = {
        pgrs_sts_cd: 'J001S',
        usr_req_div_cd: 'J003PET',
        req_acct_conn_id: parentProps.items.acct_conn_id,
        req_acct_id: parentProps.items.acct_id
      }
      const { data } = await call_userPcPeriodHistory(queryParams)
      if (data.length > 0) {
        setParentProps((prevState) => ({
          ...prevState,
          items: {
            ...prevState.items,
            pgrs_sts_cd: 'J001S',
            desired_date: moment(data[0].req_vlid_end_dt)
          },
          message: {
            ...prevState.message,
            button: {
              ...prevState.message.button,
              apply: '신청 취소'
            }
          }
        }))
        setRequestPeriod({
          pgrs_sts_cd: 'J001S',
          req_vlid_end_dt: data[0].req_vlid_end_dt,
          usr_req_id: data[0].usr_req_id
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const userPeriodReqeust = async (props) => {
    let payload = {}
    //* 신청 중
    const parentData = { ...props.origin }
    if (parentData.pgrs_sts_cd === 'J001S') {
      payload = {
        had_acct_id: parentData.acct_id,
        pgrs_sts_cd: 'J001C',
        tgt_vm_id: parentData.vm_id
      }
      try {
        const requestId = requestPeriod.usr_req_id
        const { status } = await call_userPcPeriodRequestCancel(
          requestId,
          payload
        )
        if (status === 200) {
          message.info('신청이 취소 되었습니다.')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      //* 신청 이력 없음
      payload = {
        pgrs_sts_cd: 'J001S',
        req_acct_id: parentData.acct_id,
        req_ch_cd: 'J004USR',
        req_vlid_end_dt: moment(props.desired_date).format('YYYYMMDD'),
        tgt_acct_id: parentData.acct_id,
        tgt_vm_id: parentData.vm_id,
        usr_req_div_cd: 'J003PET'
      }
      try {
        const { status } = await call_userPcPeriodRequest(payload)
        if (status === 200) {
          message.info('기간 연장 신청 되었습니다.')
        }
      } catch (error) {
        console.log(error)
      }
    }
    parentProps.handleCancel()
  }

  return (
    <>
      <CommonModal {...parentProps} handleOk={userPeriodReqeust}>
        <Form.Item label="현재 사용기간" name="current_period">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="기간 연장 희망일" name="desired_date">
          <DatePicker
            disabled={!_.isEmpty(requestPeriod)}
            disabledDate={disabledDate}
            format={dateFormat}
          />
        </Form.Item>
      </CommonModal>
    </>
  )
}
