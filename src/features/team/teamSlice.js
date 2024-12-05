import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("adminToken");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetchTeams = createAsyncThunk("/team", async () => {
  const response = await axios.get(`${url}/teams`, { headers });

  return response.data;
});

export const postTeam = createAsyncThunk("/team/addTeam", async (newTeam) => {
  const response = await axios.post(`${url}/teams`, newTeam, { headers });

  return response.data;
});

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.status = "success";
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postTeam.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postTeam.fulfilled, (state, action) => {
      state.status = "success";
      state.teams.teams.push(action.payload.team);
    });
    builder.addCase(postTeam.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default teamSlice.reducer;
