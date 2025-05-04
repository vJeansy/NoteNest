import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // ✅ Use stored email
    pass: process.env.EMAIL_PASS, // ✅ Use App Password
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "recipient@example.com",
  subject: "Test Email",
  text: "This is a test email using Google App Passwords.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent successfully:", info.response);
  }
});

const sendConfirmationEmail = async (email, username) => {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail, SendGrid, or any SMTP provider
      auth: {
        user: process.env.EMAIL_USER, // ✅ Store email in environment variables
        pass: process.env.EMAIL_PASS, // ✅ Store password securely
      },
    });
    const mailOptions = {
      from: `"NoteNest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to NoteNest!",
      text: `Hi ${username}, thank you for registering with NoteNest! You can now start saving notes.`,
    };
    await transporter.sendMail(mailOptions);
  };

  export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await db.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
      // ✅ Send confirmation email after successful registration
      await sendConfirmationEmail(email, username);
      res.status(201).json({ message: "User created successfully. Confirmation email sent!", user: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(!user.rows.length) {
            return res.status(401).json({ message: "Invalid email or password"});
        }
        const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!isValidPassword) {
            return res.status(401).json({ message: "Invalid email or password"});
        }
        const token = jwt.sign({ userId: user.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"});
        res.json({ message: "Login successful", token, user: user.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};