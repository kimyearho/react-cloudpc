import { percent } from '../../utils/utils'

/**
 * @description 입력받은 사용자 정보를 API Spec에 연동한다.
 *
 * @param {Object} data - 입력한 사용자 정보
 */
export const userResourceFactory = (data) => {
  return {
    vm_auth_id: data.vm_auth_id,
    sw_nm: data.sw_nm,
    vm_state: data.vm_state,
    vcpu_cnt: data.vcpu_cnt,
    vhd_capa: data.vhd_capa,
    vmm_capa: data.vmm_capa,
    cpu_usage: data.cpu_usage,
    disk_total: data.disk_total,
    disk_used: data.disk_used,
    disk_used_per: percent(data.disk_used, data.disk_total),
    mem_total: data.mem_total,
    mem_used: data.mem_used,
    mem_used_per: percent(data.mem_used, data.mem_total),
    reason: data.reason,
    time: data.time
  }
}
