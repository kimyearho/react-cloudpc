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
