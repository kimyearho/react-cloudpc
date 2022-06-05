import { rest } from 'msw'
import { db_system as db } from '../db/system'

export const mock_noticeList = () => {
  return rest.get('/v1/system/notices', (req, res, ctx) => {
    const search_type = req.url.searchParams.get('search_type')
    const search_word = req.url.searchParams.get('search_word')

    let data = []
    if (search_type && search_word) {
      data = db.notice.findMany({
        where: {
          [search_type === 'T' ? 'title' : 'cont']: {
            contains: [search_word]
          }
        }
      })
    } else if (!search_type && search_word) {
      let title = db.notice.findMany({
        where: {
          title: {
            contains: [search_word]
          }
        }
      })
      if (title.length <= 0) {
        let cont = db.notice.findMany({
          where: {
            cont: {
              contains: [search_word]
            }
          }
        })
        if (cont.length > 0) {
          data = cont
        } else {
          data = []
        }
      } else {
        data = title
      }
    } else {
      data = db.noticeList.getAll().pop()
    }
    return res(ctx.json(data))
  })
}
