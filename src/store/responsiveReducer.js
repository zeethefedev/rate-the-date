import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dimensions: { width: window.innerWidth, height: window.innerHeight },
};

export const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    setDimensions: (state) => {
      state.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  },
});

export const { setDimensions } = responsiveSlice.actions;

export default responsiveSlice.reducer;
