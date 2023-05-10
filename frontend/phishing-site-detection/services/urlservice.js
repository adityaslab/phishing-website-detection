import axios from "axios";

const baseUrl = "http://localhost:8080/api/phishing";

let token = null;

const setToken = () => {
  const item = JSON.parse(localStorage.getItem("loggedSolidarityUser"));
  token = `Bearer ${item.token}`;
};

const getResult = async (data) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/getPhishingUrl`, data, config);
  return response.data;
};

const getParameters = async (data) => {
  setToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/getParameters`, data, config);
  return response.data;
};

export default { getResult, getParameters };
