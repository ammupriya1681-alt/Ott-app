// src/services/AuthService.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://ott-backend-c7cv.onrender.com/api/auth", // backend URL
});

// Register
export const register = async (email, password) => {
  try {
    const res = await API.post("/register", { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Register failed" };
  }
};

// Login
export const login = async (email, password) => {
  try {
    const res = await API.post("/login", { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// Get current user (optional)
export const getProfile = async (token) => {
  try {
    const res = await API.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Fetch user failed" };
  }
};
