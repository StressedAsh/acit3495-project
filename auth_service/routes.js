const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config");
require("dotenv").config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "User registered successfully!" });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0)
      return res.status(401).json({ message: "Invalid username or password" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    // Redirect user to the data service
    res.redirect(`http://localhost:5002/form?token=${token}`);
  });
});

module.exports = router;
