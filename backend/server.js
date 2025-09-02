const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

// Import Routes
const authRoute = require("./routes/auth");

// Use Routes
app.use("/api/auth", authRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// Test route
app.get("/", (req, res) => {
    res.send("✅ OTT Backend Running Successfully!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
