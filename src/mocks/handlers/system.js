import { rest } from 'msw'
import noticeList from '../json/noticeList.json'

export const mock_noticeList = () => {
  return rest.get('/v1/system/notices', (_, res, ctx) => {
    return res(ctx.json(noticeList))
  })
}
