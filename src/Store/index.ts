// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import effectReducer from './slice';

const store = configureStore({
  reducer: {
    effect: effectReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
