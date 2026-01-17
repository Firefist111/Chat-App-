import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUserThunk,
  getUserThunk,
  userLoginThunk,
  userLogoutThunk,
  userSignupThunk,
} from "./userThunk";

const initialState = {
  user: null,
  selectedUser:  null,
  isAuthenticated: false,
  otherUsers: [],
  buttonLoading: false,
  screenLoading: true,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(userLoginThunk.pending, (state) => {
        state.buttonLoading = true;
        state.error = null;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(userSignupThunk.pending, (state) => {
        state.buttonLoading = true;
        state.error = null;
      })
      .addCase(userSignupThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(userLogoutThunk.pending, (state) => {
        state.buttonLoading = true;
        state.error = null;
      })
      .addCase(userLogoutThunk.fulfilled, (state) => {
        state.buttonLoading = false;
        state.isAuthenticated = false;
        state.selectedUser = null;
        state.user = null;
        localStorage.removeItem("selectedUser");
      })
      .addCase(userLogoutThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        state.error = action.payload;
      })

      //GET USER
      .addCase(getUserThunk.pending, (state) => {
        state.screenLoading = true
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action?.payload?.user;
        state.screenLoading = false;
      })
      .addCase(getUserThunk.rejected, (state,action) => {
        state.screenLoading = false;
        state.error = action.payload
      })

      //GET OTHER USER
      .addCase(getOtherUserThunk.pending, (state) => {
        state.screenLoading = true;
        state.error = null;
      })
      .addCase(getOtherUserThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.otherUsers = action.payload?.user;
      })
      .addCase(getOtherUserThunk.rejected, (state, action) => {
        state.screenLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
