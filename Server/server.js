require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON
app.use(express.json());

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb Is Connected Successfully"))
  .catch((e) => console.error("Database Connection Error:", e));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error Stack:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
