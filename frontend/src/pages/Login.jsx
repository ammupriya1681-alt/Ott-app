import React, { useState } from "react";
import { login, register } from "../services/AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      setMessage("Login Success ✅");
      console.log("Login Response:", res);
    } catch (error) {
      setMessage("Login Failed ❌");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await register(email, password);
      setMessage("Register Success ✅");
      console.log("Register Response:", res);
    } catch (error) {
      setMessage("Register Failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login / Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "8px" }}
      />

      <button onClick={handleLogin} style={{ marginRight: "10px" }}>
        Login
      </button>
      <button onClick={handleRegister}>Register</button>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
};

export default Login;
