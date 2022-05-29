import { notification } from 'antd'
import _ from 'lodash'

const def = {
  message: '성공',
  description: '정상 처리 되었습니다.'
}

/**
 * @description
 * Notifacation Success
 *
 * @param {Object} data - {message: string, description: string}
 */
export const notificationSuccess = (data) => {
  notification.success({
    message: !_.isEmpty(data.message) ? data.message : def.message,
    description: !_.isEmpty(data.description)
      ? data.description
      : def.description,
    placement: 'topRight'
  })
}

/**
 * @description
 * Notifacation Info
 *
 * @param {Object} data - {message: string, description: string}
 */
export const notificationInfo = (data) => {
  notification.info({
    message: !_.isEmpty(data.message) ? data.message : def.message,
    description: !_.isEmpty(data.description)
      ? data.description
      : def.description,
    placement: 'topRight'
  })
}

/**
 * @description
 * Notifacation Error
 *
 * @param {Object} data - {message: string, description: string}
 */
export const notificationError = (data) => {
  notification.error({
    message: !_.isEmpty(data.message) ? data.message : def.message,
    description: !_.isEmpty(data.description)
      ? data.description
      : def.description,
    placement: 'topRight'
  })
}
