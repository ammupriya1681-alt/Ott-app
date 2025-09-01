import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*",   // allow all origins
    credentials: true
}));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected...");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// Simple test route
app.get("/", (req, res) => {
    res.send("🚀 OTT Backend Running Successfully!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
