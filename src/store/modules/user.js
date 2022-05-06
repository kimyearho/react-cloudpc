import { createSlice } from '@reduxjs/toolkit'
import { userResponseFactory } from '../../api/factory/user_factory'
import { authUser, userAccount, staticPublic } from '../actions/user_action'
import { setToken, getToken, removeToken } from '../../utils/storage'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      connURI: 'AAA',
      accessToken: getToken() || null,
      isAuthentication: sessionStorage.isAuthentication || false
    },
    userAccount: JSON.parse(sessionStorage.user || null) || {},
    portalPublic: JSON.parse(sessionStorage.portalPublic || null) || {
      login: {
        lin_bg_basic_yn: 'Y',
        lin_bg_file_id: null,
        lin_bg_file_nm: null,
        lin_bg_stor_path: null
      },
      portal: {
        ptal_bg_basic_yn: 'Y',
        ptal_bg_file_id: null,
        ptal_bg_file_nm: null,
        ptal_bg_stor_path: null
      }
    }
  },
  reducers: {
    SET_META: (state, action) => {
      state.portalPublic = action.payload
    },
    SET_TOKEN: (state, action) => {
      state.userInfo.accessToken = action.payload
      setToken(action.payload)
    },
    SET_LOGOUT: (state) => {
      state.userInfo.isAuthentication = false
      state.userInfo.accessToken = ''
      sessionStorage.removeItem('isAuthentication')
      removeToken()
    }
  },
  extraReducers: {
    [staticPublic.fulfilled]: (state, { payload }) => {
      state.portalPublic.portal = {
        ptal_bg_basic_yn: payload.ptal_bg_basic_yn,
        ptal_bg_file_id: payload.ptal_bg_file_id,
        ptal_bg_file_nm: payload.ptal_bg_file_nm,
        ptal_bg_stor_path: payload.ptal_bg_stor_path
      }
      state.portalPublic.login = {
        lin_bg_basic_yn: payload.lin_bg_basic_yn,
        lin_bg_file_id: payload.lin_bg_file_id,
        lin_bg_file_nm: payload.lin_bg_file_nm,
        lin_bg_stor_path: payload.lin_bg_stor_path
      }
      // sessionStorage.portalPublic = JSON.stringify(state.portalPublic)
    },
    [staticPublic.rejected]: (state, actions) => {
      console.log('staticPublic rejected', actions)
      state.portalPublic.login = {
        lin_bg_basic_yn: 'Y',
        lin_bg_file_id: null,
        lin_bg_file_nm: null,
        lin_bg_stor_path: null
      }
    },
    //* ---
    [authUser.pending]: (state) => {
      state.userInfo.isAuthentication = false
      state.userInfo.accessToken = null
    },
    [authUser.fulfilled]: (state, { payload }) => {
      state.userInfo.isAuthentication = true
      state.userInfo.accessToken = payload.headers.authorization
      removeToken()
      sessionStorage.isAuthentication = true
      setToken(payload.headers.authorization)
    },
    [authUser.rejected]: (state, actions) => {
      console.log('authUser rejected', actions)
      state.userInfo.isAuthentication = false
    },
    //* ---
    [userAccount.pending]: (state) => {
      state.userAccount = null
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
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('isAuthentication')
      removeToken()
    }
  }
})

export const { SET_META, SET_TOKEN, SET_LOGOUT } = userSlice.actions
export default userSlice.reducer
