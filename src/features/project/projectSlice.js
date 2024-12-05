import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("adminToken");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetchProjects = createAsyncThunk("/projects/fetch", async () => {
  const response = await axios.get(`${url}/projects`, { headers: headers });

  return response.data;
});

export const postProject = createAsyncThunk(
  "/project/addProject",
  async (newProject) => {
    const response = await axios.post(`${url}/projects`, newProject, {
      headers: headers,
    });

    console.log(response.data);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(postProject.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postProject.fulfilled, (state, action) => {
      state.status = "success";
      state.projects.projects.push(action.payload.project);
    });
    builder.addCase(postProject.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.error;
    });
  },
});

export default projectSlice.reducer;
