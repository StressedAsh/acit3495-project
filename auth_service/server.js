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

// 🔹 Serve static files from the `views` directory
app.use(express.static(path.join(__dirname, "views")));

// 🔹 Define root route to serve `index.html`
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 🔹 Serve login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// 🔹 Serve register page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// 🔹 API Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
