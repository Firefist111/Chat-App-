import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../components/utility/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessageThunk",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/message/send/${receiverId}`, {
        message
      });
      const data = response.data;
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send message";
      return rejectWithValue(message);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/getMessageThunk",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/message/${receiverId}`);
      const data = response.data;
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to get message";
      return rejectWithValue(message);
    }
  }
);
