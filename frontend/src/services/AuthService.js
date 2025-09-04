import axios from "axios";

// Backend API URL (deploy panna Render backend URL use pannu)
const API_URL = "https://ott-backend-c7cv.onrender.com/api/auth";

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login error" };
  }
};

export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Register error" };
  }
};
