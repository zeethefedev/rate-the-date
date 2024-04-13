import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFormApi, updateFormApi } from "./response.api";

const fetchFormById = createAsyncThunk("/form", async (Id) => {
  const response = await fetchFormApi(Id);
  return response.data;
});

const updateForm = createAsyncThunk("/update-form", async (form) => {
  console.log(form);
  const response = await updateFormApi(form);
  return response.data;
});

export { fetchFormById, updateForm };
