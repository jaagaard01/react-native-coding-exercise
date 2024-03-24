import { Flight } from "../../types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Flight = {
  mission_name: "",
  id: "",
  launch_year: null,
  rocket: {
    rocket_name: "",
    rocket_type: "",
  },
};

export const flightSlice = createSlice({
  name: "flightInfo",
  initialState,
  reducers: {
    setFlightInfo: (state, action: { payload: Flight }) => ({
      ...state,
      ...action.payload,
    }),
    resetFlightInfo: () => initialState,
  },
});

export const { setFlightInfo, resetFlightInfo } = flightSlice.actions;
export default flightSlice.reducer;
