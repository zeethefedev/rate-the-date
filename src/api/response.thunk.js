import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFormApi } from "./response.api";

const fetchFormById = createAsyncThunk("/form", async (Id) => {
  const response = await fetchFormApi(Id);
  return response.data;
});

export { fetchFormById };
