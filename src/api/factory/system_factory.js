/**
 * @description
 * 자가 오류 복구 목록에 필요한 정보를 할당 합니다.
 *
 * @param {Array<T>} data - 자가 복구 목록
 */
export const recoveryFactory = (data) => {
  let list = []
  data.forEach((item, index) => {
    list.push({
      key: index,
      act_tm: item.act_tm,
      tnt_mtd_cd_nm: item.tnt_mtd_cd_nm,
      vm_nm: item.vm_nm,
      act_cd: item.act_cd,
      act_cd_nm: item.act_cd_nm
    })
  })
  return list
}

/**
 * @description
 * 가상 PC 목록에 필요한 정보를 할당 합니다.
 *
 * @param {Array<T>} data - 가상 PC 전체 목록
 */
export const resourceFactory = (data) => {
  let list = []
  data.forEach((item, index) => {
    list.push({
      key: index,
      tnt_mtd_cd_nm: item.tnt_mtd_cd_nm,
      vm_nm: item.vm_nm,
      vm_als: item.vm_als,
      vm_auth_id: item.vm_auth_id,
      vm_power_sts_cd: item.vm_power_sts_cd
    })
  })
  return list
}

/**
 * @description
 * 공지 사항 목록에 필요한 정보를 할당 합니다.
 *
 * @param {Array<T>} data - 공지 사항 목록
 */
export const noticeFactory = (data) => {
  let list = []
  data.forEach((item, index) => {
    list.push({
      key: index,
      noti_wrt_no: item.noti_wrt_no,
      title: item.title,
      acct_nm: item.acct_nm,
      reg_ts: item.reg_ts
    })
  })
  return list
}
