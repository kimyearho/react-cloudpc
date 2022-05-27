import request from '../utils/request'

/**
 * @description 모든 리소스 정보를 조회한다.
 *
 * @authority User
 */
export const call_resource = async () => {
  const { data } = await request.get(`/v1/resource/vpcs/resources`)
  return data
}

/**
 * @description 특정 리소스 정보를 조회한다.
 *
 * @authority User
 * @param {String} vmAuthId - 가상 PC 인증 아이디
 */
export const call_userResource = async (vmAuthId) => {
  const { data } = await request.get(`/v1/resource/vpcs/resources/${vmAuthId}`)
  return data
}

/**
 * @description 특정 이미지 정보를 조회한다.
 *
 * @authority User
 * @param {String} imageId - 이미지 아이디
 */
export const call_imageInfo = async (imageId) => {
  const { data } = await request.get(`/v1/resource/images/${imageId}`)
  return data
}

/**
 * @description
 * 가상 PC 자원 사용률 정보를 조회한다.
 *
 * @authority User
 * @param {String} vmAuthId - 가상 PC 할당 아이디
 */
export const call_resourceUsage = async (vmAuthId) => {
  const { data } = await request.get(
    `/v1/management/dashboard/user/${vmAuthId}/stat`
  )
  return data
}

/**
 * @description
 * 가상 PC 별칭을 변경합니다.
 *
 * @authority User
 * @param {String} vmAuthId - 가상 PC 할당 아이디
 * @param {String} newAlias - 새 별칭
 */
export const call_updateVmAlias = async ({ vmAuthId, newAlias }) => {
  const body = { vm_als: newAlias }
  const response = await request.put(
    `/v1/resource/vpcs/resources/${vmAuthId}/user`,
    body
  )
  return response
}

/**
 * @description
 * 가상 PC 오류 복구를 실행합니다.
 *
 * @param {String} vmAuthId - 가상 PC 할당 아이디
 */
export const call_updateVmRecovery = async (vmAuthId) => {
  const body = { user_workset_yn: 'Y' }
  const response = await request.post(
    `/v1/resource/vpcs/resources/${vmAuthId}/initial`,
    body
  )
  return response
}
