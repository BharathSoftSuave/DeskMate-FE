import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "offline",
  display_name: "offline",
  is_checkin: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action) => {

      state.status = action.payload.status;
      state.display_name = action.payload.display_name;
    },
    setCheckinStatus: (state, action) => {
      console.log("Checkin Status Action Payload:", action.payload);
      
      state.status = action.payload.status;
      state.display_name = action.payload.display_name;
      console.log("Updated Checkin Status:", state.status, state.display_name);
      
    },
  },
});

export const { setStatus, setCheckinStatus } = statusSlice.actions;
export default statusSlice.reducer;
