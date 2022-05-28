import { Tag } from 'antd'

export const recoveryColumns = [
  {
    title: '실행 일자',
    dataIndex: 'act_tm',
    key: 'act_tm'
  },
  {
    title: 'Cloud PC 유형',
    dataIndex: 'tnt_mtd_cd_nm',
    key: 'tnt_mtd_cd_nm'
  },
  {
    title: '가상 PC 명',
    dataIndex: 'vm_nm',
    key: 'vm_nm'
  },
  {
    title: '복구 결과',
    key: 'act_cd_nm',
    dataIndex: 'act_cd_nm',
    render: (_, { act_cd, act_cd_nm }) => {
      const customColor = act_cd === 'Z007E1B' ? '#108ee9' : '#f50'
      return (
        <>
          <Tag color={customColor} key={act_cd_nm}>
            {act_cd_nm}
          </Tag>
        </>
      )
    }
  }
]

export const recoveryModalColumns = [
  {
    title: 'Cloud PC 유형',
    dataIndex: 'tnt_mtd_cd_nm'
  },
  {
    title: 'Cloud PC ID',
    dataIndex: 'vm_nm'
  },
  {
    title: 'Cloud PC 별칭',
    dataIndex: 'vm_als'
  }
]
