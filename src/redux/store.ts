import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './loginSlice'
import productSlice from './productSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    product: productSlice,
  }
})