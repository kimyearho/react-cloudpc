import { mock_staticPublic, mock_userAccount, mock_userAuth } from './user'
import {
  mock_resource,
  mock_userResource,
  mock_userResourceImage,
  mock_userResourceUse
} from './resource'
import { mock_securityPolicy } from './security'

const module = [
  mock_staticPublic(),
  mock_userAuth(),
  mock_userAccount(),
  mock_resource(),
  mock_userResource(),
  mock_userResourceImage(),
  mock_userResourceUse(),
  mock_securityPolicy()
]

export default module
