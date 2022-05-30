import { setupWorker } from 'msw'
import module from './handlers'

// Setup requests interception using the given handlers.
export const worker = setupWorker(...module)
