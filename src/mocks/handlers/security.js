import { rest } from 'msw'
import { db_operation as db } from '../db/operation'

export const mock_securityPolicy = () => {
  return rest.get(
    '/v1/operation/cert/secu/info/:secu_plcy_id',
    (req, res, ctx) => {
      const { secu_plcy_id } = req.params
      const data = db.policy.findFirst({
        where: {
          secu_plcy_id: {
            equals: secu_plcy_id
          }
        }
      })
      return res(ctx.json(data))
    }
  )
}
