import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      const socket = io(import.meta.env.VITE_URL_ORIGIN, {
        query: {
          userId: action.payload,
        },
      });
      state.socket = socket;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
      state.onlineUsers = [];
    },
  },
});

export const { initializeSocket, setOnlineUsers, clearSocket } = socketSlice.actions;

export default socketSlice.reducer;
