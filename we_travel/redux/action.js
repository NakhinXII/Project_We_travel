import { createSlice } from "@reduxjs/toolkit";
const initialState = { codesFrom: [], codesTo: [] };

const flightslice = createSlice({
  name: "Flightcode",
  initialState: initialState,
  reducers: {
    addCodes(state, action) {
      console.log("addCodes is activated", action.payload);
      state.push(action.payload);
      console.log(state);
    },
  },
});
const { actions, reducer } = flightslice;
export const {addCodes} = actions
export default reducer;
