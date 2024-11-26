import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskResponse } from '../../types';
import { api } from '../../api/api';

interface TaskState {
  tasks: Task[];
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
  loading: boolean;
  error: string | null;
  sortBy: string;
  order: string;
}

const initialState: TaskState = {
  tasks: [],
  total: 0,
  pages: 0,
  currentPage: 1,
  perPage: 3,
  loading: false,
  error: null,
  sortBy: 'created_at',
  order: 'desc',
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ page, sortBy, order }: { page: number; sortBy: string; order: string }) => {
    const response = await api.get(`/api/tasks?page=${page}&sort_by=${sortBy}&order=${order}`);
    return response;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: { username: string; email: string; text: string }) => {
    await api.post('/api/tasks', task);
    return task;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updates }: { taskId: number; updates: Partial<Task> }) => {
    await api.put(`/api/tasks/${taskId}`, updates);
    return { taskId, updates };
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskResponse>) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
        state.currentPage = action.payload.current_page;
        state.perPage = action.payload.per_page;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка в получении заданий';
      })
      .addCase(createTask.fulfilled, (state) => {
        // Refresh tasks will be handled by fetchTasks
      })
      .addCase(updateTask.fulfilled, (state) => {
        // Refresh tasks will be handled by fetchTasks
      });
  },
});

export const { setSortBy, setOrder } = taskSlice.actions;
export default taskSlice.reducer;
