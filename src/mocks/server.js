import { setupWorker } from 'msw'
import module from './handlers'

import { userInit } from './db/user'
import { resourceInit } from './db/resource'
import { operationInit } from './db/operation'
import { systemInit } from './db/system'

export function setupBrowserMock() {
  userInit()
  resourceInit()
  operationInit()
  systemInit()
  setupWorker(...module).start()
}
