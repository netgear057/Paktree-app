import { configureStore } from "@reduxjs/toolkit";
import productReducer from './ProductSlice'
import authReducer from './AuthSlice'
export const store = configureStore({
    reducer:{
        products : productReducer,
        auth : authReducer
    }
})