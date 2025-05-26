import { configureStore } from '@reduxjs/toolkit';
import farmerReducer from '../features/farmer/farmersSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    farmers: farmerReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
