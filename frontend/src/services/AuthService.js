import axios from "axios";

const API_URL = "https://ott-backend-c7cv.onrender.com/api/auth"; // backend base URL

// Register
export const register = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Register failed" };
  }
};

// Login
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("user");
};
