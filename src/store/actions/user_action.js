import { createAsyncThunk } from '@reduxjs/toolkit'
import { call_public, call_auth, call_userAccount } from '../../api/user'

export const staticPublic = createAsyncThunk(
  'user/staticPublic',
  async (payload, thunkAPI) => {
    try {
      return await call_public()
    } catch (error) {
      return thunkAPI.rejectWithValue([], error)
    }
  }
)

/**
 * @description 사용자 정보를 인증 요청하기 위한 비동시 action
 *
 * @param {Object} payload - 사용자 로그인 정보
 */
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

/**
 * @description 사용자 계정을 조회하기 위한 비동기 action
 *
 * @param {Object} payload - 사용자 계정 UUID 및 토큰
 */
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
