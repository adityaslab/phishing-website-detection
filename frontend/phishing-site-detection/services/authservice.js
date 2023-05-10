import axios from "axios";
const baseUrl = "http://localhost:8080/api/auth";

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/authenticate`, credentials);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);
  return response.data;
};

export default { login, register };
