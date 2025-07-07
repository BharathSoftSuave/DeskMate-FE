import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status: "offline",
  display_name: "offline",
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      console.log("Setting status:", action.payload);
      state.status = action.payload.status;
      state.display_name = action.payload.display_name;
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;