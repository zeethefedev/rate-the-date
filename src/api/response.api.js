import axios from "axios";

const BASE_URL = "http://localhost:3001/forms";

const fetchFormApi = (Id) => {
  return axios.get(`${BASE_URL}/${Id}`);
};

//PATCH
const updateFormApi = (form) => {
  return axios.patch(`${BASE_URL}/${form.id}`, { questions: form.questions });
};

export { fetchFormApi, updateFormApi };
