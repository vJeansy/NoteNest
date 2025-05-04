import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { authenticateUser } from "../middleware/auth.js"; // Middleware to protect routes

const router = express.Router();

router.get("/", authenticateUser, getNotes);
router.post("/", authenticateUser, createNote);
router.put("/:id", authenticateUser, updateNote);
router.delete("/:id", authenticateUser, deleteNote);

export default router;