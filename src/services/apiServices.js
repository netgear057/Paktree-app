import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../config/apiCongig';


// export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
//   try {
//     const res =  await axios.get(`${API}/products`)
//     return res.data
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message)
//   }

// });


export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/products`, {
        params: filters
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/products`, productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
