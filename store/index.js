import { configureStore } from '@reduxjs/toolkit'

// reducers
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'

const reducer = {
  auth: authReducer,
  product: productReducer
}

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
