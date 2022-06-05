import { setupWorker } from 'msw'
import module from './handlers'

import { userInit } from './db/user'
import { resourceInit } from './db/resource'
import { operationInit } from './db/operation'
import { systemInit } from './db/system'

//* In-Memory Database
export function setupBrowserMock() {
  //* USER API 초기화
  userInit()
  //* RESOURCE API 초기화
  resourceInit()
  //* OPERATION API 초기화
  operationInit()
  //* SYSTEM API 초기화
  systemInit()
  //* SERVICE WORKER 시작
  setupWorker(...module).start()
}
