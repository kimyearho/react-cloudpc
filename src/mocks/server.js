import { setupWorker } from 'msw'
import { staticMetaData } from './handlers/user'

// Setup requests interception using the given handlers.
export const worker = setupWorker(...staticMetaData)
