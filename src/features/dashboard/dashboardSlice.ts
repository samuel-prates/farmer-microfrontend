import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for our dashboard data
interface FarmStates {
  [state: string]: number;
}

interface HarvestCultures {
  [culture: string]: number;
}

interface Areas {
  totalArableArea: number;
  totalVegetationArea: number;
}

interface DashboardState {
  farmStates: FarmStates;
  harvestCultures: HarvestCultures;
  areas: Areas;
  totalFarms: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: DashboardState = {
  farmStates: {},
  harvestCultures: {},
  areas: {
    totalArableArea: 0,
    totalVegetationArea: 0
  },
  totalFarms: 0,
  status: 'idle',
  error: null
};

// Async thunks for fetching dashboard data
export const fetchFarmStates = createAsyncThunk('dashboard/fetchFarmStates', async () => {
  const response = await axios.get('http://localhost:3000/api/dashboard/farm-states');
  return response.data;
});

export const fetchHarvestCultures = createAsyncThunk('dashboard/fetchHarvestCultures', async () => {
  const response = await axios.get('http://localhost:3000/api/dashboard/harvest-cultures');
  return response.data;
});

export const fetchAreas = createAsyncThunk('dashboard/fetchAreas', async () => {
  const response = await axios.get('http://localhost:3000/api/dashboard/areas');
  return response.data;
});

// Create the dashboard slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Farm States
      .addCase(fetchFarmStates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFarmStates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.farmStates = action.payload;
        state.totalFarms = Object.values(action.payload).reduce((sum: number, count: number) => sum + count, 0);
      })
      .addCase(fetchFarmStates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch farm states';
      })

      // Harvest Cultures
      .addCase(fetchHarvestCultures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHarvestCultures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.harvestCultures = action.payload;
      })
      .addCase(fetchHarvestCultures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch harvest cultures';
      })

      // Areas
      .addCase(fetchAreas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch areas';
      });
  },
});

export default dashboardSlice.reducer;
