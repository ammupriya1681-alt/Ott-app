import React, { useState } from "react";
import { login, register } from "../services/AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      console.log("✅ Login Success:", res);
      alert("✅ Login Success: " + JSON.stringify(res));
      setMessage("✅ Login Success");
    } catch (error) {
      console.error("❌ Login Failed:", error);
      alert("❌ Login Failed: " + error.message);
      setMessage("❌ Login Failed");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await register(email, password);
      console.log("✅ Register Success:", res);
      alert("✅ Register Success: " + JSON.stringify(res));
      setMessage("✅ Register Success");
    } catch (error) {
      console.error("❌ Register Failed:", error);
      alert("❌ Register Failed: " + error.message);
      setMessage("❌ Register Failed");
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
