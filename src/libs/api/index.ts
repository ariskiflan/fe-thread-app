import axios from "axios";

const apiConfig = axios.create({
  // baseURL: "http://localhost:5000/api/v1/",
  baseURL: "https://be-thread-app-production.up.railway.app/api/v1/",
});

export default apiConfig;
