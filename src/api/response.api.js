import axios from "axios";
import { baseUrl } from "./constant.api";

//GET BY ID
export const fetchFormApi = (Id) => {
  const api = `${baseUrl}/form/${Id}`;
  debugger;
  return axios.get(`${baseUrl}/form/${Id}`);
};

//PATCH
export const updateFormApi = (form) => {
  return axios.patch(`${baseUrl}/edit-form/${form.id}`, {
    questions: form.questions,
  });
};
