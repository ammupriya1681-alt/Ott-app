const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Demo user DB (later DB connect pannalam)
const users = [];

// Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username & Password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });

    res.json({ message: "User registered successfully 🚀" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, "secretKey", { expiresIn: "1h" });

    res.json({ message: "Login success ✅", token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working fine 🚀" });
});

module.exports = router;
