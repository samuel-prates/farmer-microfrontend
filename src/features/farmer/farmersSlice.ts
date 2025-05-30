import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fetchFarmer = createAsyncThunk(
  'farmers/fetchAll', 
  async (params: PaginationParams = { page: 1, limit: 10 }) => {
    const { page, limit } = params;
    const response = await axios.get(`http://localhost:3000/api/farmers?page=${page}&limit=${limit}`);
    return response.data as PaginatedResult<any>;
  }
);

interface FarmersState {
  farmers: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const initialState: FarmersState = {
  farmers: [],
  status: 'idle',
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
};

const farmersSlice = createSlice({
  name: 'farmers',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFarmer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.farmers = action.payload.items;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages
        };
      })
      .addCase(fetchFarmer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch farmers';
      });
  },
});

export const { setPage } = farmersSlice.actions;
export default farmersSlice.reducer;
