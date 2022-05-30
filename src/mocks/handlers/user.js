import { rest } from 'msw'
import vmPeriodHistory from '../json/vmPeriodHistory.json'

import { db_user } from '../db/user'

export const mock_staticPublic = () => {
  return rest.get(
    '/v1/nauth/system/portals/ui/BBB/public/:type',
    (_, res, ctx) => {
      return res(ctx.json(db_user.static.getAll().pop()))
    }
  )
}

export const mock_userAuth = () => {
  return rest.post('/v1/gw/authentications/', (req, res, ctx) => {
    return res(ctx.json(db_user.auth.getAll().pop()))
  })
}

export const mock_userAccount = () => {
  return rest.get('/v1/user/accounts/:acct_id', (req, res, ctx) => {
    return res(ctx.json(db_user.account.getAll().pop()))
  })
}

export const mock_userPcPeriodHistory = () => {
  return rest.get('/v1/user/work/request', (req, res, ctx) => {
    return res(ctx.json(vmPeriodHistory))
  })
}

export const mock_userPcPeriodRequest = () => {
  return rest.post('/v1/user/work/request', (_, res, ctx) => {
    return res(ctx.status(200))
  })
}

export const mock_userPcPeriodRequestCancel = () => {
  return rest.put('/v1/user/work/request/:request_id', (_, res, ctx) => {
    return res(ctx.status(200))
  })
}
