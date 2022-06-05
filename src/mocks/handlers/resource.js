import { rest } from 'msw'
import { db_resource as db } from '../db/resource'

//* 전체 가상 PC 목록을 조회 합니다.
export const mock_resource = () => {
  return rest.get('/v1/resource/vpcs/resources', (_, res, ctx) => {
    return res(ctx.json(db.resources.getAll().pop()))
  })
}

//* 특정 가상 PC를 조회 합니다.
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

//* 특정 가상 PC의 사용률을 조회 합니다.
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

//* 특정 이미지 정보를 조회 합니다.
export const mock_userResourceImage = () => {
  return rest.get('/v1/resource/images/:image_id', (_, res, ctx) => {
    return res(ctx.json(db.images.getAll().pop()))
  })
}

//* 특정 가상 PC의 별칭을 변경 합니다.
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

//* 자가 오류 복구를 실행 합니다. (데이터 변경은 없음)
export const mock_updateVmRecovery = () => {
  return rest.post(
    '/v1/resource/vpcs/resources/:vm_auth_id/initial',
    (_, res, ctx) => {
      return res(ctx.json())
    }
  )
}
