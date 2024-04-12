import axios from "axios";

const BASE_URL = "http://localhost:3001/forms";

const fetchFormApi = (Id) => {
  return axios.get(`${BASE_URL}/${Id}`);
};

//PATCH

export { fetchFormApi };
