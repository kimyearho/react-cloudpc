import { factory, primaryKey, manyOf } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import _ from 'lodash'
import userOperationList from '../json/userOperationList.json'

export const db_operation = factory({
  policyList: {
    id: primaryKey(faker.datatype.uuid),
    data: manyOf('policy')
  },
  policy: {
    id: primaryKey(faker.datatype.uuid),
    secu_plcy_id: String,
    pcly_cert: manyOf('policyIn')
  },
  policyIn: {
    id: primaryKey(faker.datatype.uuid),
    secu_plcy_id: String,
    conn_net_cd_nm: String,
    clb_shar_auth_cd_nm: String,
    drag_drop_auth_cd_nm: String,
    fold_shar_auth_cd_nm: String,
    usb_conn_auth_cd_nm: String,
    prt_conn_auth_cd_nm: String,
    mult_mtor_auth_cd_nm: String,
    url_rdrt_auth_cd_nm: String,
    scr_capture_yn: String
  }
})

const createDefaultPclyCert = () => {
  return _.map(userOperationList['data'], (item) =>
    db_operation.policyIn.create(item.pcly_cert[0])
  )
}

const createPolicy = () => {
  const defaultPolicys = createDefaultPclyCert()
  if (defaultPolicys.length > 0) {
    const policys = _.map(defaultPolicys, (item) =>
      db_operation.policy.create({
        secu_plcy_id: item.secu_plcy_id,
        pcly_cert: item
      })
    )
    return policys
  }
}

export const operationInit = () => {
  db_operation.policyList.create({ data: createPolicy() })
}
