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

const initialState = {
  isLoginModalOpen: false,
  // Directly retrieve userInfo from localStorage and parse it if it exists
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  isAuthenticated: !!localStorage.getItem("userInfo"), // Determine if user is authenticated based on userInfo existence
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Store userInfo and mark user as authenticated
      state.userInfo = action.payload;
      state.isAuthenticated = true;

      // Store user info and expiration time in localStorage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      // Set expiration time (e.g., 30 days from now)
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    logout: (state) => {
      // Clear the state and localStorage on logout
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout , openLoginModal, closeLoginModal } = authSlice.actions;
export default authSlice.reducer;
