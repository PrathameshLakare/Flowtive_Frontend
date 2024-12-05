import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("adminToken");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetchAllUsersData = createAsyncThunk(
  "/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/users`, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersData.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.users;
    });
    builder.addCase(fetchAllUsersData.rejected, (state, action) => {
      state.status = "error";
      state.users = action.error.message;
    });
  },
});

export default userSlice.reducer;
