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
  origin: [
    "https://notenest-alpha.vercel.app", // Production
    "https://notenest-orfy3tc5q-vjeansys-projects.vercel.app", // Preview 1
    "https://notenest-207utcs2m-vjeansys-projects.vercel.app"  // Preview 2
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});