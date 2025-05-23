import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFarmer = createAsyncThunk('farmer/fetchFarmer', async () => {
  const response = await axios.get('http://localhost:3000/farmer');
  return response.data;
});

const farmersSlice = createSlice({
  name: 'farmers',
  initialState: { farmers: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFarmer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.farmers = action.payload;
      })
      .addCase(fetchFarmer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default farmersSlice.reducer;