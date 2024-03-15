import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasksSlice';

const store = configureStore({
  reducer: {
    tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
