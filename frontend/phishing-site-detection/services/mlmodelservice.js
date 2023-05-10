import axios from "axios";

const baseUrl = "http://127.0.0.1:5000/api/";

const getPrediction = async (data) => {
  const response = await axios.post(`${baseUrl}`, data);
  return response.data;
};

export default { getPrediction };
