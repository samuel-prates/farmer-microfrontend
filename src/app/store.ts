import { configureStore } from '@reduxjs/toolkit';
import farmerReducer from '../features/farmer/farmersSlice';

export const store = configureStore({
  reducer: {
    farmers: farmerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;