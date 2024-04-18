import axios from "axios";
import { BASE_URL } from "./constant.api";

//GET BY ID
export const fetchFormApi = (Id) => {
  return axios.get(`${BASE_URL}/form/${Id}`);
};

//PATCH
export const updateFormApi = (form) => {
  return axios.patch(`${BASE_URL}/edit-form/${form.id}`, {
    questions: form.questions,
  });
};
