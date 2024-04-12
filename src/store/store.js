import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionReducer";
import responseReducer from "./responseReducer";

export const store = configureStore({
  reducer: { questionReducer: questionReducer, responseReducer },
});
