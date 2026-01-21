import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../../components/utility/axiosInstance";

export const userLoginThunk = createAsyncThunk(
  "user/userLoginThunk",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", {
        userName,
        password,
      });
      const data = response.data;
      toast.success("Login successful");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const userSignupThunk = createAsyncThunk(
  "user/userSignupThunk",
  async (
    { userName, password, fullName, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return rejectWithValue("Passwords do not match");
      }
      const response = await api.post("/user/signup", {
        userName,
        password,
        fullName,
      });
      const data = response.data;
      toast.success("Register successful");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Registeration failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const userLogoutThunk = createAsyncThunk(
  "user/userLogoutThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/logout");
      const data = response.data;
      toast.success("Logout successful");
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/get-profile");
      const data = response.data;
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "fetch failed";
      return rejectWithValue(message);
    }
  }
);

export const getOtherUserThunk = createAsyncThunk(
  "user/getOtherUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/get-users");
      const data = response.data;
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "fetch failed";
      return rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({avatar}, { rejectWithValue }) => {
    try {
      const response = await api.put("/user/update-profile",{avatar});
      const data = response.data;
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Upload failed";
      return rejectWithValue(message);
    }
  },
);
