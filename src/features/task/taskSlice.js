import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("adminToken");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const fetchTasks = createAsyncThunk("/tasks/fetch", async (filters) => {
  const response = await axios.get(`${url}/tasks`, {
    headers,
    params: filters,
  });

  return response.data;
});

export const postTask = createAsyncThunk("/tasks/post", async (newTask) => {
  const response = await axios.post(`${url}/tasks`, newTask, {
    headers,
  });

  return response.data;
});

export const updateTask = createAsyncThunk(
  "/tasks/update",
  async ({ id, updatedTask }) => {
    const response = await axios.post(`${url}/tasks/${id}`, updatedTask, {
      headers,
    });

    return response.data;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postTask.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postTask.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks.push(action.payload.task);
    });
    builder.addCase(postTask.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload.task._id
      );

      state.tasks[index] = action.payload.task;
    });
  },
});

export default taskSlice.reducer;
