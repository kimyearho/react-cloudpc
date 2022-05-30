import { rest } from 'msw'
import userSecurityPolicy from '../json/userOperation.json'

export const mock_securityPolicy = () => {
  return rest.get(
    '/v1/operation/cert/secu/info/:secu_plcy_id',
    (_, res, ctx) => {
      return res(ctx.json(userSecurityPolicy))
    }
  )
}
