import axios from "axios";

// Create an Axios instance configured to send cookies automatically
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
