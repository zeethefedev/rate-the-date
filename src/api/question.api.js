import axios from "axios";
import { baseUrl } from "./constant.api";

export const fetchFormsApi = () => {
  return axios.get(`${baseUrl}/all-forms`);
};

//POST
export const postFormApi = (form) => {
  return axios.post(`${baseUrl}/add-form`, form);
};
