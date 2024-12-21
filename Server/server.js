require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ConnectDB = require("./DB/db");
const cookieParser = require("cookie-parser");
const { register } = require("./controllers/user.controller");
const userRoutes = require("./Router/user.route");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error Stack:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// Start the server
// Database connection
ConnectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is now listetinin on port ${PORT}`);
  })
);
