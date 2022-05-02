import request from '../utils/request'

const userRequesteFactory = (data) => {
  return {
    acct_conn_id: data.username,
    passwd: data.password,
    usr_ptal_conn_uri: 'AAA'
  }
}

export const userResponseFactory = (data) => {
  return {
    acct_conn_id: data.acct_conn_id,
    acct_conn_sts_cd: data.acct_conn_sts_cd,
    acct_id: data.acct_id,
    acct_nm: data.acct_nm,
    acct_sts_cd: data.acct_sts_cd,
    acct_sts_cd_nm: data.acct_sts_cd_nm,
    email: data.email,
    tnt_id: data.tnt_id,
    tnt_nm: data.tnt_nm,
    usr_grp_id: data.usr_grp_id,
    usr_grp_nm: data.usr_grp_nm,
    cert_plcy_id: data.cert_plcy_id,
    cert_plcy_nm: data.cert_plcy_nm
  }
}

export const call_userAccount = async ({ acctId, accessToken }) => {
  const { data } = await request.get(`/v1/user/accounts/${acctId}`, {
    headers: {
      Authorization: accessToken
    }
  })
  return data
}

export const call_auth = async (params) => {
  const payload = userRequesteFactory(params)
  const { data, headers } = await request.post(
    '/v1/gw/authentications/',
    payload
  )
  return { data, headers }
}
