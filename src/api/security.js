import { service as request } from '../utils/request'

/**
 * @description 특정 보안 정책을 조회한다.
 *
 * @authority User
 * @param securityId - 보안 정책 아이디
 */
export const call_securityPolicy = async (securityId) => {
  const { data } = await request.get(
    `/v1/operation/cert/secu/info/${securityId}`
  )
  return data
}
