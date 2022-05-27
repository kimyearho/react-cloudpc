import { service as request } from '../utils/request'

/**
 * @description 자가 오류 복구를 조회한다.
 *
 * @authority User
 * @param params - query string
 */
export const call_recoveryList = async (params) => {
  const { data } = await request.get('/v1/user/accounts/usg/history', {
    params
  })
  return data
}
