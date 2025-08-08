// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { login, refreshToken, register } from "../services/apiServices";


const storedUser = localStorage.getItem('user') ?
JSON.parse(localStorage.getItem('user')) : null

const storedToken = localStorage.getItem('accessToken') || null

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    accessToken: storedToken,
    isAuthenticated: !! storedUser,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutSuccess(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // REFRESH
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
         state.isAuthenticated = true
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.error = action.payload;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
