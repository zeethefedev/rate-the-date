import axios from "axios";

const BASE_URL = "http://localhost:3001/forms";

const fetchFormsApi = () => {
  return axios.get(BASE_URL);
};

//POST
const postFormApi = (form) => {
  return axios.post(BASE_URL, form);
};

export { fetchFormsApi, postFormApi };
