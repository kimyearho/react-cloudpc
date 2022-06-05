import { rest } from 'msw'

import { db_user as db } from '../db/user'

//* 정적 정보 API를 조회합니다.
export const mock_staticPublic = () => {
  return rest.get(
    '/v1/nauth/system/portals/ui/BBB/public/:type',
    (_, res, ctx) => {
      return res(ctx.json(db.static.getAll().pop()))
    }
  )
}

//* 사용자 인증 정보 API를 조회 합니다.
export const mock_userAuth = () => {
  return rest.post('/v1/gw/authentications/', (req, res, ctx) => {
    return res(ctx.json(db.auth.getAll().pop()))
  })
}

//* 사용자 계정 정보 API를 조회 합니다.
export const mock_userAccount = () => {
  return rest.get('/v1/user/accounts/:acct_id', (req, res, ctx) => {
    return res(ctx.json(db.account.getAll().pop()))
  })
}

//* 사용자 가상 PC의 기간 신청 정보를 조회 합니다.
export const mock_userPcPeriodHistory = () => {
  return rest.get('/v1/user/work/request', (req, res, ctx) => {
    return res(ctx.json(db.periodHistory.getAll().pop()))
  })
}

//* 사용자 가상 PC의 기간 연장을 신청 합니다.
export const mock_userPcPeriodRequest = () => {
  return rest.post('/v1/user/work/request', (req, res, ctx) => {
    const body = req.body
    const user = db.periodHistory.create({
      ...body
    })
    return res(ctx.json(user))
  })
}

//* 사용자 가상 PC의 기간 연장 신청을 취소 합니다.
export const mock_userPcPeriodRequestCancel = () => {
  return rest.put('/v1/user/work/request/:request_id', (req, res, ctx) => {
    const { request_id } = req.params
    const user = db.periodHistory.update({
      where: {
        usr_req_id: {
          equals: request_id
        }
      },
      data: {
        pgrs_sts_cd: '',
        req_acct_id: '',
        req_ch_cd: '',
        req_vlid_end_dt: '',
        tgt_acct_id: '',
        tgt_vm_id: '',
        usr_req_div_cd: '',
        usr_req_id: ''
      }
    })

    return res(ctx.json(user))
  })
}

//* 자가 오류 복구 목록을 조회 합니다.
export const mock_recoveryList = () => {
  return rest.get('/v1/user/accounts/usg/history', (_, res, ctx) => {
    const data = db.recovery.findMany({
      where: {
        vm_nm: {
          notEquals: ''
        }
      }
    })
    return res(ctx.json(data))
  })
}
