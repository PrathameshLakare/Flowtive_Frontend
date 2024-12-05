import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("adminToken");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetchTags = createAsyncThunk("/fetch/tags", async () => {
  const response = await axios.get(`${url}/tags`, { headers });

  return response.data;
});

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.status = "success";
      state.tags = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default tagSlice.reducer;
