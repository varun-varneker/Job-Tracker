import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    const jobCount = await prisma.job.count();
    res.json({ 
      message: "Database connected successfully!",
      connected: true,
      database: "Supabase PostgreSQL",
      tables: {
        users: userCount,
        jobs: jobCount
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Database connection failed",
      connected: false,
      error: error.message 
    });
  }
});

export default app;