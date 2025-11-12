import { configureStore } from '@reduxjs/toolkit';
import optionReducer from './app/slices/optionSlice';

export const store = configureStore({
  reducer: {
    optionSlice: optionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
