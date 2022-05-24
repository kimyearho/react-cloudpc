import request from '../utils/request'
import { userRequesteFactory } from './factory/user_factory'

/**
 * @description 사용자 포털 정적 데이터를 조회한다.
 * 주 용도는 포털 로고, 배경 이미지와 같은 이미지 정보를 가진다.
 */
export const call_public = async (params) => {
  const { data } = await request.get(
    '/v1/nauth/system/portals/ui/BBB/public/' + params
  )
  return data
}

/**
 * @description 사용자 계정 정보를 조회한다.
 *
 * @authority User
 * @param {Number} acctId - 계정 UUID
 * @param {String} accessToken - 사용자 인증 토큰
 */
export const call_userAccount = async ({ acctId }) => {
  const { data } = await request.get(`/v1/user/accounts/${acctId}`)
  return data
}

/**
 * @description 사용자 정보를 인증 요청한다.
 *
 * @param {Object} params - 사용자 로그인 정보
 */
export const call_auth = async (params) => {
  const payload = userRequesteFactory(params)
  const { data, headers } = await request.post(
    '/v1/gw/authentications/',
    payload
  )
  return { data, headers }
}

/**
 * @description
 * 기간 연장 신청 정보를 조회한다.
 *
 * @param {Object} params - 신청 정보
 * @returns {...model}
 */
export const call_userPcPeriodHistory = async (params) => {
  const { data, headers } = await request.get('/v1/user/work/request', {
    params
  })
  return { data, headers }
}

/**
 * @description
 * 사용자가 입력한 기간 만큼 연장 신청을 한다.
 * 이 스펙은 신청만 하는 것으로, 관리자 승인이 되어야한다.
 *
 * @param {Object} payload - 신청 정보
 * @returns {...model}
 */
export const call_userPcPeriodRequest = async (payload) => {
  return await request.post('/v1/user/work/request', payload)
}

/**
 * @description
 * 기간 연장을 신청한 PC에 대한 취소 요청을한다.
 *
 * @param {*} requestId - 요청 아이디
 * @param {*} payload - 요청 BODY
 * @returns Promise
 */
export const call_userPcPeriodRequestCancel = async (requestId, payload) => {
  return await request.put(`/v1/user/work/request/${requestId}`, payload)
}
