import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import userReducer from './modules/user'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
})
