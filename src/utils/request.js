import axios from 'axios'
import { uuid } from './utils'
import { getToken } from './storage'

const service = axios.create({
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
    // const token = res.headers.authorization
    // if (token) store.commit('account/SET_TOKEN', token)
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
        // store.dispatch('user/fedLogOut').then(() => {
        //   let query
        //   if (location.pathname !== '/dashboard') {
        //     query = { redirect: location.pathname }
        //   }
        //   router.replace({
        //     path: '/login',
        //     params: {
        //       errCode: apiError.code,
        //       errMsg: apiError.comment
        //     },
        //     query
        //   })
        //   alert(apiError.comment || 'Verification failed, please login again')
        // })
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

export default service
