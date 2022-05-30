import { setupWorker } from 'msw'
import module from './handlers'
import { init } from './db/user'

export function setupBrowserMock() {
  init()
  setupWorker(...module).start()
}
