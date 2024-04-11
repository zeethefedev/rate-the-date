import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFormsApi, postFormApi } from "./question.api";
import { getFormData } from "../store/method.reducer";

const fetchForms = createAsyncThunk("/all-form", async () => {
  const response = await fetchFormsApi();
  return response.data;
});

const postForm = createAsyncThunk("/post-form", async (form) => {
  const formattedForm = getFormData(form);
  const response = await postFormApi(formattedForm);
  return response.data;
});

export { fetchForms, postForm };
