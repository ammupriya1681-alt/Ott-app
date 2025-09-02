const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoute = require("./src/routes/auth.js");
const userRoute = require("./src/routes/user.js");
const movieRoute = require("./src/routes/movies.js");
const paymentRoute = require("./src/routes/payments.js");
const adminRoute = require("./src/routes/admin.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/admin", adminRoute);

// Root Test
app.get("/", (req, res) => {
  res.send("OTT Backend API Running 🚀");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
