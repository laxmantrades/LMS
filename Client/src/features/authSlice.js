import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    userLoggedIN: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    userLoggeddOut: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
export const {userLoggedIN,userLoggeddOut} = authSlice.actions;
export default authSlice.reducer;
