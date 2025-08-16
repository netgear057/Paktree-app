// services/apiServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/Axios";
import { API } from "../config/apiCongig";

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/users/register", userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/users/login", { email, password });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (filters, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/products", { params: filters });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// POST PRODUCT
export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/products", productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// USER ADS
export const userAds = createAsyncThunk(
  "ads/userAds",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// FEATURE PRODUCT (Stripe Checkout)
export const handleFeature = async ({ postId, userId }) => {
  try {
    const res = await fetch(`${API}/stripe/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, userId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    }
  } catch (err) {
    console.error(err);
  }
};
