import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("adminToken");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const signupUser = createAsyncThunk(
  "/auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/signup`, userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/login`, userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "/auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/auth/me`, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutUser: (state) => {
      state.data = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = "error";
      state.user = action.error.message;
    });
  },
});

export const { clearError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
