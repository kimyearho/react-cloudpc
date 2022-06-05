import { rest } from 'msw'
import { db_resource as db } from '../db/resource'

export const mock_resource = () => {
  return rest.get('/v1/resource/vpcs/resources', (_, res, ctx) => {
    return res(ctx.json(db.resources.getAll().pop()))
  })
}

export const mock_userResource = () => {
  return rest.get(
    '/v1/resource/vpcs/resources/:vm_auth_id',
    (req, res, ctx) => {
      const { vm_auth_id } = req.params
      const data = db.vm.findFirst({
        where: {
          vm_auth_id: {
            equals: vm_auth_id
          }
        }
      })
      return res(ctx.json(data))
    }
  )
}

export const mock_userResourceUse = () => {
  return rest.get(
    '/v1/management/dashboard/user/:vm_auth_id/stat',
    (req, res, ctx) => {
      const { vm_auth_id } = req.params
      const data = db.stat.findFirst({
        where: {
          vm_auth_id: {
            equals: vm_auth_id
          }
        }
      })
      return res(ctx.json(data))
    }
  )
}

export const mock_userResourceImage = () => {
  return rest.get('/v1/resource/images/:image_id', (_, res, ctx) => {
    return res(ctx.json(db.images.getAll().pop()))
  })
}

export const mock_changeVmAlais = () => {
  return rest.put(
    '/v1/resource/vpcs/resources/:vm_auth_id/user',
    (req, res, ctx) => {
      const { vm_auth_id } = req.params
      const { vm_als } = req.body
      const updateAlias = db.vm.update({
        where: {
          vm_auth_id: {
            equals: vm_auth_id
          }
        },
        data: {
          vm_als: vm_als
        }
      })
      console.log(updateAlias)

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
