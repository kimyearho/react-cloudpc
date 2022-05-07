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
 */
export const call_userResource = async (vmAuthId) => {
  const { data } = await request.get(`/v1/resource/vpcs/resources/${vmAuthId}`)
  return data
}

/**
 * @description 특정 이미지 정보를 조회한다.
 *
 * @authority User
 */
export const call_imageInfo = async (imageId) => {
  const { data } = await request.get(`/v1/resource/images/${imageId}`)
  return data
}
