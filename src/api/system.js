import { service as request } from '../utils/request'
import _ from 'lodash'

/**
 * @description
 * 자가 오류 복구를 조회한다.
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

/**
 * @description
 * 공지사항 목록을 조회 합니다.
 *
 * @param {Object} searchParams - 검색조건과 검색어
 */
export const call_noticeList = async (searchParams) => {
  const params = {
    noti_tgt_grp_id: 'BBB',
    sort: 'reg_ts',
    start_num: 1,
    row_count: 10
  }
  if (!_.isEmpty(searchParams)) {
    if (!_.isEmpty(searchParams.search_type)) {
      if (searchParams.search_type !== 'all') {
        params.search_type = searchParams['search_type']
      }
    }
    if (!_.isEmpty(searchParams.search_word)) {
      params.search_word = searchParams.search_word
    }
  }
  const { data } = await request.get('/v1/system/notices', { params })
  return data
}
