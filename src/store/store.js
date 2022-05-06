import { configureStore } from '@reduxjs/toolkit'
import appReducer from './modules/app'
import counterReducer from './modules/counter'
import userReducer from './modules/user'

export default configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    user: userReducer
  }
})
