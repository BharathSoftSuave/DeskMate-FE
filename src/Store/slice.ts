// store/slice.js
import { createSlice } from '@reduxjs/toolkit';

const effectSlice = createSlice({
  name: 'effect',
  initialState: { shouldRunEffect: false },
  reducers: {
    triggerEffect: (state:any) => {
      state.shouldRunEffect = !state.shouldRunEffect; // Toggle value
    },
  },
});

export const { triggerEffect } = effectSlice.actions;
export default effectSlice.reducer;
