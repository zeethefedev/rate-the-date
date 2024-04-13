import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFormApi, updateFormApi } from "./response.api";
import { getFormData } from "../store/method.reducer";

const fetchFormById = createAsyncThunk("/form", async (Id) => {
  const response = await fetchFormApi(Id);
  return response.data;
});

const updateForm = createAsyncThunk("/update-form", async (form) => {
  const formattedForm = { id: form.id, ...getFormData(form.answers) };
  const response = await updateFormApi(formattedForm);
  return response.data;
});

export { fetchFormById, updateForm };
