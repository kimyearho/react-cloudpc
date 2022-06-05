import { rest } from 'msw'
import { db_system as db } from '../db/system'

//* 공지사항 목록을 조회 합니다.
export const mock_noticeList = () => {
  return rest.get('/v1/system/notices', (req, res, ctx) => {
    //* 검색 조건 (T: 제목, C: 내용)
    const search_type = req.url.searchParams.get('search_type')
    //* 검색어
    const search_word = req.url.searchParams.get('search_word')

    let data = []
    //* 검색 조건과 검색어가 있으면
    if (search_type && search_word) {
      data = db.notice.findMany({
        where: {
          [search_type === 'T' ? 'title' : 'cont']: {
            contains: [search_word]
          }
        }
      })
    }
    //* 검색 조건이 '전체'이고, 검색어가 있으면
    else if (!search_type && search_word) {
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
      //* 그외 전체 검색
      data = db.noticeList.getAll().pop()
    }
    return res(ctx.json(data))
  })
}
