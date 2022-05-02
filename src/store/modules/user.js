import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  call_auth,
  call_userAccount,
  userResponseFactory
} from '../../api/user'

export const authUser = createAsyncThunk(
  'user/authUser',
  async (payload, thunkAPI) => {
    try {
      return await call_auth(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue([], error)
    }
  }
)

export const userAccount = createAsyncThunk(
  'user/userAccount',
  async (payload, thunkAPI) => {
    try {
      return await call_userAccount(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue([], error)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      connURI: 'AAA',
      accessToken: '',
      isAuthentication: false
    },
    userAccount: {
      acct_conn_id: '',
      acct_conn_sts_cd: '',
      acct_id: '',
      acct_nm: '',
      acct_sts_cd: '',
      acct_sts_cd_nm: '',
      email: '',
      tnt_id: '',
      tnt_nm: '',
      usr_grp_id: '',
      usr_grp_nm: '',
      cert_plcy_id: '',
      cert_plcy_nm: ''
    }
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.userInfo.accessToken = action.payload
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
    },
    [userAccount.rejected]: (state, actions) => {
      console.log('userAccount_rejected', actions)
      state.userInfo.isAuthentication = false
      state.userInfo.accessToken = ''
    }
  }
})

export default userSlice.reducer
