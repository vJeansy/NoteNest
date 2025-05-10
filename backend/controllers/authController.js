import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//  Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (email, username) => {
  const mailOptions = {
    from: `"NoteNest" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to NoteNest!",
    text: `Hi ${username}, thank you for registering with NoteNest! You can now start saving notes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

//  Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email is already in use
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rowCount > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    //  Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Insert new user
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    //  Send confirmation email
    await sendConfirmationEmail(email, username);

    res.status(201).json({ message: "User created successfully!", user: result.rows[0] });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rowCount === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //  Verify password
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //  Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user: user.rows[0] });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error, please try again later." });
  }
};