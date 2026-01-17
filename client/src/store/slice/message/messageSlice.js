import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./messageThunk";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage : (state,action)=>{
      state.messages = [...state.messages,action.payload]
    }
  },
  extraReducers: (builder) => {
    builder

      // SEND MESSAGE
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.newMessage) {
          state.messages.push(action.payload.newMessage);
        }
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MESSAGES
      .addCase(getMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload?.data?.messages || [];
      })
      .addCase(getMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setMessage} = messageSlice.actions;
export default messageSlice.reducer;
