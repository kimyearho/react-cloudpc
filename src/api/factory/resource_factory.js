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

/**
 * @description
 * CloudPc 기간 연장 신청에 필요한 모델을 정의한다.
 *
 * @param {Object} props - VM 데이터 소품
 * @returns {...model}
 */
export const userPcPeriodFactory = (props) => {
  return {
    acct_conn_id: props.acct_conn_id,
    acct_id: props.acct_id,
    usr_vm_ctrl_tm: props.usr_vm_ctrl_tm,
    os_typ_cd_nm: props.os_typ_cd_nm,
    vm_id: props.vm_id,
    vm_on_ctrl_tm: props.vm_on_ctrl_tm,
    vm_vlid_stt_dt: props.vm_vlid_stt_dt,
    vm_vlid_end_dt: props.vm_vlid_end_dt
  }
}

/**
 * @description
 * CloudPC 기본 정보, 지원 정보에 필요한 모델을 정의한다.
 *
 * @param {Object} props - VM 데이터 소품
 * @returns  {...model}
 */
export const userPcInfoFactory = (props) => {
  return {
    tnt_mtd_cd_nm: props.tnt_mtd_cd_nm,
    vm_nm: props.vm_nm,
    vm_als: props.vm_als,
    vcpu_cnt: props.vcpu_cnt,
    vmm_capa: props.vmm_capa,
    vhd_capa: props.vhd_capa,
    vm_ip: props.vm_ip
  }
}
