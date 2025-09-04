import axios from "axios";

// Backend base URL (Render la irukkura backend URL podu)
const API_URL = "https://ott-backend-c7cv.onrender.com/api/auth/";

// Register
export const register = async (email, password) => {
  try {
    const res = await axios.post(API_URL + "register", { email, password });
    return res.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const res = await axios.post(API_URL + "login", { email, password });
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Get Current User
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Logout
export const logout = () => {
  localStorage.removeItem("user");
};
