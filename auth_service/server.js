const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 🔹 Serve static files (login/register pages)
app.use(express.static(path.join(__dirname, "views")));

// 🔹 Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 🔹 Serve login and register pages
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// 🔹 API Routes
app.use("/", authRoutes); // ✅ Fix to make `/auth/register` and `/auth/login` work properly

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
