import { rest } from 'msw'
import recoveryList from '../json/recoveryList.json'
import noticeList from '../json/noticeList.json'

export const mock_recoveryList = () => {
  return rest.get('/v1/user/accounts/usg/history', (_, res, ctx) => {
    return res(ctx.json(recoveryList))
  })
}

export const mock_noticeList = () => {
  return rest.get('/v1/system/notices', (_, res, ctx) => {
    return res(ctx.json(noticeList))
  })
}
