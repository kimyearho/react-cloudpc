import {
  mock_staticPublic,
  mock_userAccount,
  mock_userAuth,
  mock_userPcPeriodHistory,
  mock_userPcPeriodRequest,
  mock_userPcPeriodRequestCancel
} from './user'
import {
  mock_resource,
  mock_userResource,
  mock_userResourceImage,
  mock_userResourceUse,
  mock_changeVmAlais,
  mock_updateVmRecovery
} from './resource'
import { mock_securityPolicy } from './security'
import { mock_recoveryList, mock_noticeList } from './system'

const module = [
  mock_staticPublic(),
  mock_userAuth(),
  mock_userAccount(),
  mock_userPcPeriodHistory(),
  mock_userPcPeriodRequest(),
  mock_userPcPeriodRequestCancel(),
  mock_resource(),
  mock_userResource(),
  mock_userResourceImage(),
  mock_userResourceUse(),
  mock_securityPolicy(),
  mock_changeVmAlais(),
  mock_updateVmRecovery(),
  mock_recoveryList(),
  mock_noticeList()
]

export default module
