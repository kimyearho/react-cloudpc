import { factory, primaryKey, nullable } from '@mswjs/data'
import { faker } from '@faker-js/faker'

import staticPublic from '../json/staticPublic.json'
import userAuth from '../json/userAuth.json'
import userAccount from '../json/userAccount.json'
import vmPeriodHistory from '../json/vmPeriodHistory.json'

export const db_user = factory({
  static: {
    id: primaryKey(faker.datatype.uuid),
    lin_bg_basic_yn: String,
    lin_bg_file_id: String,
    lin_bg_file_nm: String,
    lin_bg_stor_path: nullable(String),
    ptal_bg_basic_yn: String,
    ptal_bg_file_id: String,
    ptal_bg_file_nm: String,
    ptal_bg_stor_path: nullable(String)
  },
  auth: {
    id: primaryKey(faker.datatype.uuid),
    acct_id: String,
    acct_vlid_end_dt: String,
    grp_typ_cd: String,
    acct_conn_id: String,
    acct_nm: String,
    usr_grp_id: String,
    cert_plcy_id: String
  },
  account: {
    id: primaryKey(faker.datatype.uuid),
    acct_conn_id: String,
    acct_conn_sts_cd: String,
    acct_id: String,
    acct_nm: String,
    acct_sts_cd: String,
    acct_sts_cd_nm: String,
    email: String,
    tnt_id: String,
    tnt_nm: String,
    usr_grp_id: String,
    usr_grp_nm: String,
    cert_plcy_id: String,
    cert_plcy_nm: String,
    acct_vlid_end_dt: String
  },
  periodHistory: {
    id: primaryKey(faker.datatype.uuid),
    req_vlid_end_dt: String,
    usr_req_id: String
  }
})

export const init = () => {
  db_user.static.create(staticPublic['data'])
  db_user.auth.create(userAuth['data'])
  db_user.account.create(userAccount['data'])
  db_user.periodHistory.create(vmPeriodHistory['data'])
}
