import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://notenest-alpha.vercel.app", // Allow your Vercel frontend
  credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await db.connect();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection error:", error);
  }
});