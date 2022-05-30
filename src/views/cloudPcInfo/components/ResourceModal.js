/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker } from 'antd'
import {
  call_userPcPeriodHistory,
  call_userPcPeriodRequest,
  call_userPcPeriodRequestCancel
} from '../../../api/user'
import CommonWrapperModal from '../../../components/modal/CommonWrapperModal'
import { confirmBox, infoBox } from '../../../components/messageBox/MessageBox'
import {
  notificationSuccess,
  notificationInfo
} from '../../../components/notification/Notification'

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

  //* Mounted!
  useEffect(() => {
    fetchUserPeriodRequestHistory()
  }, [])

  /**
   * @description
   * 오늘 이전의 날짜는 선택할 수 없도록 한다.
   *
   * @param {Object} current - 오늘 날짜
   * @returns moment
   */
  const disabledDate = (current) => {
    let endDate = parentProps.modalData.vm_vlid_end_dt
    return current && current < moment(endDate, 'YYYY-MM-DD')
  }

  /**
   * @description
   * 사용자 PC 기간 요청 이력을 조회한다.
   */
  const fetchUserPeriodRequestHistory = async () => {
    try {
      const queryParams = {
        pgrs_sts_cd: 'J001S',
        usr_req_div_cd: 'J003PET',
        req_acct_conn_id: parentProps.modalData.acct_conn_id,
        req_acct_id: parentProps.modalData.acct_id
      }
      const { data } = await call_userPcPeriodHistory(queryParams)
      if (data.length > 0) {
        //* React는 불변성을 유지해야하지만 동적으로 Props를 변경이 필요할 때가 있다.
        //* 그 경우 아래처럼 상태를 복사하여 덮어쓰는 형태로 재사용이 가능하다.
        //* 참고로 Object type의 props는 상태변경시 비용이 많이들어 Not bad하다.
        setParentProps((prevState) => ({
          ...prevState,
          modalData: {
            ...prevState.modalData,
            pgrs_sts_cd: 'J001S',
            desired_date: moment(data[0].req_vlid_end_dt)
          },
          modalOptions: {
            ...prevState.modalOptions,
            buttonLabel: {
              ...prevState.modalOptions.buttonLabel,
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

  /**
   * @description
   * 사용자 PC 기간 연장 신청이나 취소를 한다.
   *
   * @param {*} props - Form data
   */
  const userPeriodReqeust = async (props) => {
    const parentData = { ...props.origin }
    let payload = {}
    //* 신청 중
    if (parentData.pgrs_sts_cd === 'J001S') {
      payload = {
        had_acct_id: parentData.acct_id,
        pgrs_sts_cd: 'J001C',
        tgt_vm_id: parentData.vm_id
      }

      const confirmProps = {
        title: '알림',
        content: <>Cloud PC 기간 연장 신청을 취소하시겠습니까?</>
      }
      confirmBox(confirmProps, async () => {
        try {
          const requestId = requestPeriod.usr_req_id
          const { status } = await call_userPcPeriodRequestCancel(
            requestId,
            payload
          )
          if (status === 200) {
            notificationInfo({
              message: '알림',
              description: '신청이 취소 되었습니다.'
            })
            parentProps.handleCancel()
          }
        } catch (error) {
          console.log(error)
        }
      })
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
      const infoProps = {
        title: '알림',
        content: (
          <>
            Cloud PC 기간 연장 신청이 접수되었습니다.
            <br /> 담당 관리자의검토 후 처리 예정입니다.
          </>
        )
      }
      infoBox(infoProps, async () => {
        try {
          const { status } = await call_userPcPeriodRequest(payload)
          if (status === 200) {
            notificationSuccess({ description: '기간 연장 신청 되었습니다.' })
            parentProps.handleCancel()
          }
        } catch (error) {
          console.log(error)
        }
      })
    }
  }

  return (
    <>
      <CommonWrapperModal {...parentProps} handleOk={userPeriodReqeust}>
        <Form.Item label="현재 사용기간" name="current_period">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="기간 연장 희망일" name="desired_date">
          <DatePicker
            style={{ width: '100%' }}
            allowClear={false}
            disabled={!_.isEmpty(requestPeriod)}
            disabledDate={disabledDate}
            format={dateFormat}
          />
        </Form.Item>
      </CommonWrapperModal>
    </>
  )
}
