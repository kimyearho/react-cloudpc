import { setupWorker } from 'msw'
import module from './handlers'

import { userInit } from './db/user'
import { resourceInit } from './db/resource'

export function setupBrowserMock() {
  userInit()
  resourceInit()
  setupWorker(...module).start()
}
