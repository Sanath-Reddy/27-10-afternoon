const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes  = require("./routes/courseRoutes");

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toLocaleTimeString()}`);
  next();
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("StudentDesk API is running");
});

app.use("/api/students", studentRoutes);
app.use("/api/courses",  courseRoutes);

module.exports = app;
