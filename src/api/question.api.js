import axios from "axios";
import { BASE_URL } from "./constant.api";

export const fetchFormsApi = () => {
  return axios.get(`${BASE_URL}/all-forms`);
};

//POST
export const postFormApi = (form) => {
  return axios.post(`${BASE_URL}/add-form`, form);
};
