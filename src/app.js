import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();

/*
========================
  GLOBAL MIDDLEWARE
========================
*/

app.use(cors());
app.use(express.json());

/*
========================
  HEALTH CHECK
========================
*/

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Job Tracker API Running 🚀",
  });
});

/*
========================
  DATABASE TEST ROUTE
========================
*/

app.get("/api/test-db", async (req, res) => {
  try {
    await prisma.$connect();

    const userCount = await prisma.user.count();
    const jobCount = await prisma.job.count();

    res.json({
      status: "success",
      message: "Database connected successfully!",
      database: "Supabase PostgreSQL",
      tables: {
        users: userCount,
        jobs: jobCount,
      },
    });
  } catch (error) {
    console.error("DB Test Error:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

/*
========================
  AUTH ROUTES & JOB ROUTES
========================
*/

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

/*
========================
  PROTECTED ROUTE EXAMPLE
========================
*/

app.get("/api/protected", protect, (req, res) => {
  res.json({
    status: "success",
    message: "You accessed a protected route 🔐",
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    },
  });
});

/*
========================
  GLOBAL ERROR HANDLER
========================
*/

app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

export default app;