import { createSlice } from '@reduxjs/toolkit'
import { userResponseFactory } from '../../api/factory/user_factory'
import { authUser, userAccount } from '../actions/user_action'
import { setToken, getToken, removeToken } from '../../utils/storage'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      connURI: 'AAA',
      accessToken: getToken() || null,
      isAuthentication: sessionStorage.isAuthentication || false
    },
    userAccount: JSON.parse(sessionStorage.user || null) || {}
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.userInfo.accessToken = action.payload
      setToken(action.payload)
    },
    SET_LOGOUT: (state, action) => {
      state.userInfo.isAuthentication = false
      state.userInfo.accessToken = ''
      sessionStorage.removeItem('isAuthentication')
      removeToken()
    }
  },
  extraReducers: {
    [authUser.pending]: (state, actions) => {
      console.log('pending', actions)
      state.userInfo.isAuthentication = false
    },
    [authUser.fulfilled]: (state, { payload }) => {
      state.userInfo.isAuthentication = true
      state.userInfo.accessToken = payload.headers.authorization
      sessionStorage.isAuthentication = true
      setToken(payload.headers.authorization)
    },
    [authUser.rejected]: (state, actions) => {
      console.log('authUser rejected', actions)
      state.userInfo.isAuthentication = false
    },
    [userAccount.pending]: (state, actions) => {
      console.log('userAccount_pending', actions)
    },
    [userAccount.fulfilled]: (state, { payload }) => {
      console.log('userAccount_fulfilled', payload)
      state.userAccount = userResponseFactory(payload)
      sessionStorage.user = JSON.stringify(userResponseFactory(payload))
    },
    [userAccount.rejected]: (state, actions) => {
      console.log('userAccount_rejected', actions)
      state.userInfo.isAuthentication = false
      state.userInfo.accessToken = null
      state.userAccount = null
      sessionStorage.removeItem('isAuthentication')
      removeToken()
    }
  }
})

export const { SET_TOKEN, SET_LOGOUT } = userSlice.actions
export default userSlice.reducer
