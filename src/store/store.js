import { configureStore } from '@reduxjs/toolkit'
import appReducer from './modules/app'
import userReducer from './modules/user'

export default configureStore({
  reducer: {
    app: appReducer,
    user: userReducer
  }
})
