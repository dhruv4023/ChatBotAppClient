import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
  user: null,
  token: null,
  uploadedFiles: null,
  chats: null
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUploadedFiles: (state, action) => {
      state.uploadedFiles = action.payload.uploadedFiles;
    },
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = `Bearer ${action.payload.token}`;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.chats = null;
      state.uploadedFiles = null;
    },
  },
});

export const {
  setUploadedFiles,
  setMode,
  setLogin,
  setChats,
  setLogout
} = authState.actions;

export default authState.reducer;
