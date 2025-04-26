// server.js - Entry point for the application
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const { setupRoutes } = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Setup routes
setupRoutes(app);

// Root route
app.get("/", (req, res) => {
  res.send("Job Task Planner server");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});