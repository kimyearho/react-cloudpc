import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
