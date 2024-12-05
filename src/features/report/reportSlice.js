import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("adminToken");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetchReportLastWeek = createAsyncThunk(
  "fetch/report/last-week",
  async () => {
    const response = await axios.get(`${url}/report/last-week`, { headers });
    return response.data;
  }
);

export const fetchReportPendingWork = createAsyncThunk(
  "fetch/report/pending",
  async () => {
    const response = await axios.get(`${url}/report/pending`, { headers });
    return response.data;
  }
);

export const fetchReportClosedByTeam = createAsyncThunk(
  "fetch/report/closed-tasks/team",
  async () => {
    const response = await axios.get(`${url}/report/closed-tasks`, {
      headers,
      params: { groupBy: "team" },
    });
    return response.data;
  }
);

export const fetchReportClosedByProject = createAsyncThunk(
  "fetch/report/closed-tasks/project",
  async () => {
    const response = await axios.get(`${url}/report/closed-tasks`, {
      headers,
      params: { groupBy: "project" },
    });
    return response.data;
  }
);

export const fetchReportClosedByOwner = createAsyncThunk(
  "fetch/report/closed-tasks/owner",
  async () => {
    const response = await axios.get(`${url}/report/closed-tasks`, {
      headers,
      params: { groupBy: "owners" },
    });
    return response.data;
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    lastWeekData: [],
    pendingDaysData: [],
    closedByTeam: [],
    closedByProject: [],
    closedByOwner: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReportLastWeek.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchReportLastWeek.fulfilled, (state, action) => {
      state.lastWeekData = action.payload.data;
      state.status = "success";
    });
    builder.addCase(fetchReportLastWeek.rejected, (state, action) => {
      state.error = action.payload.error;
      state.status = "error";
    });
    builder.addCase(fetchReportPendingWork.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchReportPendingWork.fulfilled, (state, action) => {
      state.status = "success";
      state.pendingDaysData = action.payload.data;
    });
    builder.addCase(fetchReportPendingWork.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(fetchReportClosedByTeam.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchReportClosedByTeam.fulfilled, (state, action) => {
      state.status = "success";
      state.closedByTeam = action.payload.data;
    });
    builder.addCase(fetchReportClosedByTeam.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(fetchReportClosedByProject.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchReportClosedByProject.fulfilled, (state, action) => {
      state.status = "success";
      state.closedByProject = action.payload.data;
    });
    builder.addCase(fetchReportClosedByProject.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(fetchReportClosedByOwner.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchReportClosedByOwner.fulfilled, (state, action) => {
      state.status = "success";
      state.closedByOwner = action.payload.data;
    });
    builder.addCase(fetchReportClosedByOwner.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default reportSlice.reducer;
