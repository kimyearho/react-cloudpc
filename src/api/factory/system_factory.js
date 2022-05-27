/**
 * @description 자가 오류 복구
 *
 * @param {Object} props - Pros
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
