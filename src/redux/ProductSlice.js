// src/features/products/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, postProduct } from '../services/apiServices'

const initialState = {
  items: [],
  total: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // POST
       builder
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // or handle however you want
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // // DELETE
      // .addCase(deleteProduct.fulfilled, (state, action) => {
      //   state.items = state.items.filter((item) => item._id !== action.payload);
      // })

      // // PUT/UPDATE
      // .addCase(updateProduct.fulfilled, (state, action) => {
      //   const index = state.items.findIndex(p => p._id === action.payload._id);
      //   if (index !== -1) state.items[index] = action.payload;
      // });
  },
});

export default productSlice.reducer;
