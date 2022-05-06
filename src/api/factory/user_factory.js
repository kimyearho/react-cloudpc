/**
 * @description 입력받은 사용자 정보를 API Spec에 연동한다.
 *
 * @param {Object} data - 입력한 사용자 정보
 */
export const userRequesteFactory = (data) => {
  return {
    acct_conn_id: data.username,
    passwd: data.password,
    usr_ptal_conn_uri: 'AAA'
  }
}

/**
 * @description 사용자 계정 정보를 정해진 규격에 재할당한다.
 *
 * @authority User
 * @param {Object} data - 조회된 사용자 계정 정보
 */
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

export const userPublicMeta = (payload) => {
  return {
    login: {
      lin_bg_basic_yn: payload.lin_bg_basic_yn,
      lin_bg_file_id: payload.lin_bg_file_id,
      lin_bg_file_nm: payload.lin_bg_file_nm,
      lin_bg_stor_path: payload.lin_bg_stor_path
    },
    portal: {
      ptal_bg_basic_yn: payload.ptal_bg_basic_yn,
      ptal_bg_file_id: payload.ptal_bg_file_id,
      ptal_bg_file_nm: payload.ptal_bg_file_nm,
      ptal_bg_stor_path: payload.ptal_bg_stor_path
    }
  }
}
