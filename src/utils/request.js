import axios from 'axios'
import { uuid } from './utils'
import { getToken } from './storage'
import { infoBox } from '../components/messageBox/MessageBox'

import { SET_LOGOUT } from '../store/modules/user'
import { SET_LOADING } from '../store/modules/app'

let store
export const injectStore = (_store) => {
  store = _store
}

export const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
})

//* HTTP 요청 인터셉터
service.interceptors.request.use((config) => {
  config.headers['X-CloudPC-Request-Poc'] = 'POCUSER'
  config.headers['X-CloudPC-Request-ID'] = uuid()
  config.headers['Accept-Language'] = 'ko'
  if (getToken) {
    config.headers['authorization'] = getToken()
  }
  return config
})

service.interceptors.response.use(
  (res) => {
    res['data'] = res.data.data || res.data
    return res
  },
  (error) => {
    const res = error && error.response,
      apiError = res && res.data && res.data.error,
      forwardCodes = error.config.forwardCodes,
      isForward =
        Array.isArray(forwardCodes) &&
        apiError &&
        forwardCodes.includes(apiError.code)
    if (apiError) {
      if ('AGW-1003,AGW-1004,AGW-1005'.indexOf(apiError.code) > -1) {
        const boxProps = {
          title: '알림',
          content: '인증이 만료되어 로그인 페이지로 이동합니다.'
        }
        infoBox(boxProps, async () => {
          try {
            await store.dispatch(SET_LOADING(true))
            setTimeout(() => {
              store.dispatch(SET_LOGOUT())
              window.location.href = '/login'
              store.dispatch(SET_LOADING(false))
            }, 600)
          } catch (error) {
            console.error(error)
          }
        })
      } else {
        if ('AGW-1007'.indexOf(apiError.code) > -1) {
          console.log('AGW-1007 error')
        } else {
          const message = `${apiError.comment}`
          if (message && !isForward) {
            alert(message)
          } else {
            alert(message)
          }
        }
      }
    } else {
      alert('API ERROR MODEL 미정의 => 담당자에게 확인 부탁 드립니다.')
    }
  }
)
