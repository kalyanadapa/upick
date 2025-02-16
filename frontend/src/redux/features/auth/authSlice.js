// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("userInfo", JSON.stringify(action.payload));

//       const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
//       localStorage.setItem("expirationTime", expirationTime);
//     },
//     logout: (state) => {
//       state.userInfo = null;
//       localStorage.clear();
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const isTokenValid = () => {
  const expirationTime = localStorage.getItem("expirationTime");
  return expirationTime && new Date().getTime() < Number(expirationTime);
};

const initialState = {
  userInfo: localStorage.getItem("userInfo") && isTokenValid()
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
    isAuthenticated: !!(localStorage.getItem("userInfo") && isTokenValid())
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true; // Mark user as authenticated
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    checkAuthState: (state) => {
      state.isAuthenticated = state.userInfo && isTokenValid();
    },
  },
});

export const { setCredentials, logout, checkAuthState } = authSlice.actions;
export default authSlice.reducer;
