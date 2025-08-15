import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../config/apiCongig";
import axiosInstance from "../utils/Axios";

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
      const res = await axiosInstance.post(
        `/users/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// REFRESH
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/users/refresh");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (filters, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/products", {
        params: filters,
        withCredentials: true, // ✅ correctly placed inside config object
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const postProduct = createAsyncThunk(
  "products/postProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${API}/products`, productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const userAds = createAsyncThunk(
  "ads/userAds",
  async (userId, { rejectWithValue}) => {
    try {
      const res = await axiosInstance.get(`${API}/products/${userId}`)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

export  const handleFeature = async ({postId, userId}) => {
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