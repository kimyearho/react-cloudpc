import { factory, primaryKey, manyOf } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import _ from 'lodash'

import noticeListData from '../json/noticeList.json'

export const db_system = factory({
  noticeList: {
    id: primaryKey(faker.datatype.uuid),
    data: manyOf('notice')
  },
  notice: {
    id: primaryKey(faker.datatype.uuid),
    noti_wrt_no: String,
    title: String,
    acct_nm: String,
    cont: String,
    reg_ts: String
  }
})

const init = () => {
  return _.map(noticeListData['data'], (item) =>
    db_system.notice.create({ ...item })
  )
}

export const systemInit = () => {
  db_system.noticeList.create({ data: init() })
}
