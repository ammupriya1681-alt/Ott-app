import axios from "axios";

const API_URL = "https://ott-backend-c7cv.onrender.com/api/auth";

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Register failed" };
  }
};
