import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = createAsyncThunk("auth/login", async (loginForm, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      headers: { "Content-Type": "application/json" },
      email: loginForm.email,
      password: loginForm.password,
      rememberMe: loginForm.rememberMe,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    return thunkAPI.rejectWithValue(
      error.response?.data?.message
    );
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { token } = thunkAPI.getState().auth;
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message
    );
  }
});

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // extraReducers for login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
        state.token = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
      });

  },
});

export default authSlice.reducer;