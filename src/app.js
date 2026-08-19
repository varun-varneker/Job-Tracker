import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


import { protect } from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Job Tracker API Running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/jobs", protect, jobRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Protected Route Example
app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;