// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login,  logoutUser,  register,restoreSession,userAds } from "../services/apiServices";


// const storedUser = localStorage.getItem('user') ?
// JSON.parse(localStorage.getItem('user')) : null

// const storedToken = localStorage.getItem('accessToken') || null

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
    allAds: []
  },
  //====================local staorage==============================
  // initialState: {
  //   user: storedUser,
  //   allAds : [],
  //   accessToken: storedToken,
  //   isAuthenticated: !! storedUser,
  //   status: "idle",
  //   error: null,
  // },
  reducers: {
    logoutSuccess(state) {
      state.user = null;
      // state.accessToken = null;
      state.status = "idle";
      state.error = null;
      // localStorage.removeItem("user");
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");  
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
        // state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true

        // localStorage.setItem("user", JSON.stringify(action.payload.user));
        // localStorage.setItem("accessToken", action.payload.accessToken);
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
        // state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true
        // localStorage.setItem("user", JSON.stringify(action.payload.user));
        // localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

     

      // user ads

      .addCase(userAds.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allAds = action.payload;
    
      })
      .addCase(userAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

  // Restore session/me
     .addCase(restoreSession.pending, (state) => {
  state.status = "loading";
})
.addCase(restoreSession.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.user = action.payload.user; // or action.payload
  state.isAuthenticated = true;
})
.addCase(restoreSession.rejected, (state) => {
  state.status = "idle";
  state.user = null;
  state.isAuthenticated = false;
})
// =========== Logout =====================
.addCase(logoutUser.fulfilled, (state) => {
  state.user = null;
  state.isAuthenticated = false;
  state.status = "idle";
})


  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
