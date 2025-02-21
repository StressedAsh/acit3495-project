const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config"); // Ensure this is correctly set up
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 🔹 Register a new user
router.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 Login user
router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token in response instead of redirecting
    res.json({ message: "Login successful", token: token });
  });
});

// 🔹 Logout user
router.get("/auth/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
