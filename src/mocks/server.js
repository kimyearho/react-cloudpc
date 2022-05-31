import { setupWorker } from 'msw'
import module from './handlers'

import { userInit } from './db/user'
import { resourceInit } from './db/resource'
import { operationInit } from './db/operation'

export function setupBrowserMock() {
  userInit()
  resourceInit()
  operationInit()
  setupWorker(...module).start()
}
