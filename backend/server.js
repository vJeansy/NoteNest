import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Log incoming requests for better debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//  CORS setup for secure access
app.use(cors({
  origin: [
    "https://notenest-alpha.vercel.app",
    "https://notenest-orfy3tc5q-vjeansys-projects.vercel.app",
    "https://notenest-207utcs2m-vjeansys-projects.vercel.app",
    //"http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
}));

//  Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  Register routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

//  Ensure DB connection is valid before starting the server
db.query("SELECT 1")
  .then(() => {
    console.log("✅ Database connected successfully");
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit process if DB isn't reachable
  });

//  Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});