import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../model/product';

const ptoductSlice = createSlice({
    name: 'login',
    initialState: {
      products: Array<Product>(),
    },
    reducers: {
        updateProducts: (state, action:PayloadAction<Array<Product>>) => {
          return {... state, products: action.payload}
        },
        
        updateAddProduct: (state, action:PayloadAction<Product>) => {
            return {... state, products: [action.payload]}
        },
        
        updateEditProduct: (state, action:PayloadAction<Product>) => {
          const newState = {products: state.products.filter(product => product.id !== action.payload.id)};
          return {... newState, products: [action.payload]}
        },

        updateRemoveProduct: (state, action:PayloadAction<Product>) => {
          const newState = {products: state.products.filter(product => product.id !== action.payload.id)};
          return {... newState}
        },
      },
  })
  
  export const { updateProducts, updateAddProduct, updateEditProduct, updateRemoveProduct } = ptoductSlice.actions
  export default ptoductSlice.reducer