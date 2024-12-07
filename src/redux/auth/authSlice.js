import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (loginForm, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: loginForm.email,
          password: loginForm.password,
          remember_me: loginForm.remember_me,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { token } = thunkAPI.getState().auth;
  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const getProfile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
  const { token } = thunkAPI.getState().auth;
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isSuccess: false,
  expiry: null,
  isLoggingOut: false
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
        state.user = action.payload.user;
        const now = Date.now();
        const expiryDuration = action.payload.remember_me
          ? 7 * 24 * 60 * 60 * 1000
          : 1 * 60 * 60 * 1000;
        state.expiry = now + expiryDuration;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong 11";
      })

      // extraReducers for profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // extraReducers for logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.isLoggingOut = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.expiry = null;
        state.loading = false;
        state.isSuccess = true;
        state.isLoggingOut = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
        state.loading = false;
        state.isLoggingOut = false;
      });
  },
});

export default authSlice.reducer;
