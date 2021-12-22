import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addedItems:[]
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    product(state , action) {
      state = {...state,...action.payload}
      return state
    },
    updateProduct(state , action) {
      state = {...state,...action.payload}
      return state
    },
  },
})

export const { product , updateProduct } = productSlice.actions
export default productSlice.reducer
