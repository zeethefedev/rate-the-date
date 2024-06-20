import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionReducer";
import responseReducer from "./responseReducer";
import responsiveReducer from "./responsiveReducer";

export const store = configureStore({
  reducer: { questionReducer, responseReducer, responsiveReducer },
});
