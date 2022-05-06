import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false
  },
  reducers: {
    SET_LOADING: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { SET_LOADING } = appSlice.actions
export default appSlice.reducer
