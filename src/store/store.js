import { configureStore } from "@reduxjs/toolkit";
import reducer from "./questionReducer";

export const store = configureStore({
  reducer: { reducer },
});
