import { rest } from 'msw'
import resourceListData from '../json/resourceList.json'
import userResourceData from '../json/userResource.json'
import userResourceImage from '../json/userResourceImage.json'
import userResourceUse from '../json/userResourceUse.json'

export const mock_resource = () => {
  return rest.get('/v1/resource/vpcs/resources', (_, res, ctx) => {
    return res(ctx.json(resourceListData))
  })
}

export const mock_userResource = () => {
  return rest.get('/v1/resource/vpcs/resources/:vm_auth_id', (_, res, ctx) => {
    return res(ctx.json(userResourceData))
  })
}

export const mock_userResourceImage = () => {
  return rest.get('/v1/resource/images/:image_id', (_, res, ctx) => {
    return res(ctx.json(userResourceImage))
  })
}

export const mock_userResourceUse = () => {
  return rest.get(
    '/v1/management/dashboard/user/:vm_auth_id/stat',
    (_, res, ctx) => {
      return res(ctx.json(userResourceUse))
    }
  )
}

export const mock_changeVmAlais = () => {
  return rest.put(
    '/v1/resource/vpcs/resources/:vm_auth_id/user',
    (_, res, ctx) => {
      return res(ctx.json())
    }
  )
}

export const mock_updateVmRecovery = () => {
  return rest.post(
    '/v1/resource/vpcs/resources/:vm_auth_id/initial',
    (_, res, ctx) => {
      return res(ctx.json())
    }
  )
}
