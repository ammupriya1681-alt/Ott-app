import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes import
import authRoute from "./src/routes/auth.js";
import paymentsRoute from "./src/routes/payments.js";
import moviesRoute from "./src/routes/movies.js";
import userRoute from "./src/routes/user.js";
import adminRoute from "./src/routes/admin.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
