import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const auth = createAsyncThunk("users/login", async user => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
    login: user.login,
    password: user.password,
  });
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {data: {}, logedIn: false},
  reducers: {
    logout(state, action) {
      state.data = {};
      state.logedIn = false;
    },
  },
  extraReducers: {
    [auth.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.data = action.payload.data;
        state.logedIn = true;
      } else {
        if (action.payload.message) {
          state.data = action.payload.message;
          state.logedIn = false;
        }
      }
    },
  },
});

export const {connect, logout} = userSlice.actions;
export default userSlice.reducer;
