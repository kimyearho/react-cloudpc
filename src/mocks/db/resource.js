import { factory, primaryKey, nullable, manyOf } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import resourceList from '../json/resourceList.json'
import userResourceImage from '../json/userResourceImage.json'
import userResourceUse from '../json/userResourceUse.json'

export const db_resource = factory({
  resources: {
    id: primaryKey(faker.datatype.uuid),
    data: manyOf('vm')
  },
  vm: {
    id: primaryKey(faker.datatype.uuid),
    vm_ip: String,
    vm_nm: String,
    vm_auth_id: String,
    vm_als: String,
    vm_state: String,
    vcpu_cnt: String,
    vmm_capa: String,
    vhd_capa: String,
    img_id: String,
    acct_conn_id: String,
    acct_id: String,
    usr_vm_ctrl_tm: String,
    os_typ_cd_nm: String,
    vm_on_ctrl_tm: String,
    vm_vlid_stt_dt: String,
    vm_vlid_end_dt: String,
    tnt_mtd_cd_nm: String,
    vm_power_sts_cd: String,
    secu_plcy_id: String
  },
  images: {
    id: primaryKey(faker.datatype.uuid),
    img_id: String,
    img_nm: String,
    img_descp: nullable(String),
    sw_nm: String
  },
  monitor: {
    id: primaryKey(faker.datatype.uuid),
    data: manyOf('stat')
  },
  stat: {
    id: primaryKey(faker.datatype.uuid),
    cpu_usage: Number,
    mem_total: Number,
    mem_used: Number,
    disk_total: Number,
    disk_used: Number,
    vm_auth_id: String,
    reason: nullable(String)
  }
})

const vm_list_init = [
  db_resource.vm.create({ ...resourceList['data'][0] }),
  db_resource.vm.create({ ...resourceList['data'][1] }),
  db_resource.vm.create({ ...resourceList['data'][2] })
]

const stat_init = [
  db_resource.stat.create({ ...userResourceUse['data'][0] }),
  db_resource.stat.create({ ...userResourceUse['data'][1] }),
  db_resource.stat.create({ ...userResourceUse['data'][2] })
]

export const resourceInit = () => {
  db_resource.resources.create({ data: vm_list_init })
  db_resource.images.create(userResourceImage['data'])
  db_resource.monitor.create({ data: stat_init })
}

export const resourceCount = () => {
  return db_resource.resources.count() > 0 ? true : false
}
