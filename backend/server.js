const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());


require('dotenv').config(); // at the top of file

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});


// Check MySQL Connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database!');
        connection.release();
    }
});

// Handle Sign Up
const signupUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required!" });
    }

    // Check if email already exists in the database
    const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
    console.log("Checking email:", email);  // Log the email being checked
    pool.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error("❌ Error checking email:", err);
            return res.status(500).json({ error: "Database error" });
        }

        console.log("Email check results:", results); // Log the results of the query

        // If email already exists, return error response and don't proceed with user insertion
        if (results.length > 0) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Proceed to the rest of the logic if the email doesn't exist
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("❌ Error hashing password:", err);
                return res.status(500).json({ error: "Error hashing password" });
            }

            // Insert the new user into the database
            const insertQuery = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
            pool.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error("❌ Error inserting user:", err);
                    return res.status(500).json({ error: "Error inserting user into database" });
                }

                // Respond with success once user is inserted
                return res.status(200).json({ message: "Signup successful" });
            });
        });
    });
};

   
// Handle Login
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required!" });
    }

    // Check if user exists in the database
    const sql = "SELECT * FROM login WHERE email = ?";
    pool.query(sql, [email], (err, results) => {
        if (err) {
            console.error("❌ Error checking user:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the hashed password with the one stored in the database
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                console.error("❌ Error comparing passwords:", err);
                return res.status(500).json({ error: "Error processing password" });
            }

            if (isMatch) {
                return res.status(200).json({ message: "Login successful" });
            } else {
                return res.status(400).json({ error: "Incorrect password" });
            }
        });
    });
};

// Handle Forgot Password
const forgotPassword = (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "Email and new password are required!" });
    }

    // Check if user exists in the database
    const sql = "SELECT * FROM login WHERE email = ?";
    pool.query(sql, [email], (err, results) => {
        if (err) {
            console.error("❌ Error checking user:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Hash the new password and update it in the database
        bcrypt.hash(newPassword, 10, (err, hashedNewPassword) => {
            if (err) {
                console.error("❌ Error hashing new password:", err);
                return res.status(500).json({ error: "Error resetting password" });
            }

            // Update password in the database
            const updateSql = "UPDATE login SET password = ? WHERE email = ?";
            pool.query(updateSql, [hashedNewPassword, email], (err, data) => {
                if (err) {
                    console.error("❌ Error updating password:", err);
                    return res.status(500).json({ error: "Error updating password" });
                }

                return res.json({ message: "✅ Password reset successful!" });
            });
        });
    });
};

// Define Routes
app.post('/signup', signupUser);
app.post('/login', loginUser);
app.post('/forgot-password', forgotPassword);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
