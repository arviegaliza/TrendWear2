const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8081;

// CORS - allow your frontend domain only (change accordingly)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Replace '*' with your React app URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : undefined
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
    return res.status(400).json({ success: false, message: "All fields are required." });

  pool.query("SELECT * FROM login WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (results.length > 0)
      return res.status(400).json({ success: false, message: "Email already registered." });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ success: false, message: "Password hashing error" });

      pool.query(
        "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ success: false, message: "Error creating user" });
          return res.status(200).json({ success: true, message: "Signup successful" });
        }
      );
    });
  });
});

// ----------------- LOGIN -----------------
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required." });

  pool.query("SELECT * FROM login WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (results.length === 0)
      return res.status(404).json({ success: false, message: "User not found" });

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return res.status(500).json({ success: false, message: "Password comparison error" });

      if (isMatch) {
        return res.status(200).json({ success: true, message: "Login successful" });
      } else {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }
    });
  });
});

// ----------------- FORGOT PASSWORD -----------------
app.post('/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    return res.status(400).json({ success: false, message: "Email and new password required." });

  pool.query("SELECT * FROM login WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (results.length === 0)
      return res.status(404).json({ success: false, message: "User not found" });

    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ success: false, message: "Password hashing error" });

      pool.query(
        "UPDATE login SET password = ? WHERE email = ?",
        [hashedPassword, email],
        (err) => {
          if (err) return res.status(500).json({ success: false, message: "Error updating password" });
          return res.json({ success: true, message: "✅ Password reset successful!" });
        }
      );
    });
  });
});

// ----------------- ROOT -----------------
app.get('/', (req, res) => {
  res.send('✅ TrendWear Backend is Running');
});

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
