const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool (LOCALHOST version)
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Check MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database!');
    connection.release();
  }
});

// ----------------- SIGNUP -----------------
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required." });

  pool.query("SELECT * FROM login WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0)
      return res.status(400).json({ error: "Email already registered." });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: "Password hashing error" });

      pool.query(
        "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ error: "Error creating user" });
          res.status(200).json({ message: "Signup successful" });
        }
      );
    });
  });
});

// ----------------- LOGIN -----------------
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required." });

  pool.query("SELECT * FROM login WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: "Password comparison error" });

      if (isMatch) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(400).json({ error: "Incorrect password" });
      }
    });
  });
});

// ----------------- FORGOT PASSWORD -----------------
app.post('/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    return res.status(400).json({ error: "Email and new password required." });

  pool.query("SELECT * FROM login WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0)
      return res.status(404).json({ error: "User not found" });

    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: "Password hashing error" });

      pool.query(
        "UPDATE login SET password = ? WHERE email = ?",
        [hashedPassword, email],
        (err) => {
          if (err) return res.status(500).json({ error: "Error updating password" });
          res.json({ message: "✅ Password reset successful!" });
        }
      );
    });
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
