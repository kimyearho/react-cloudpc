import { rest } from 'msw'
import staticPublicData from '../json/staticPublic.json'
import userAccountData from '../json/userAccount.json'
import userAuth from '../json/userAuth.json'

export const mock_staticPublic = () => {
  return rest.get(
    '/v1/nauth/system/portals/ui/BBB/public/:type',
    (_, res, ctx) => {
      return res(ctx.json(staticPublicData))
    }
  )
}

export const mock_userAuth = () => {
  return rest.post('/v1/gw/authentications/', (req, res, ctx) => {
    return res(ctx.json(userAuth))
  })
}

export const mock_userAccount = () => {
  return rest.get('/v1/user/accounts/:acct_id', (req, res, ctx) => {
    return res(ctx.json(userAccountData))
  })
}
