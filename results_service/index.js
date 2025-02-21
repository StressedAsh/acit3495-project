const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const MONGO_URI = `mongodb://${process.env.MONGO_HOST || "mongo"}:27017/${
  process.env.MONGO_DB || "analytics_results"
}`;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model for analytics results
const analyticsSchema = new mongoose.Schema(
  {
    metric: String,
    value: Number,
  },
  { collection: "analytics" }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

// Route: Check if service is running
app.get("/", (req, res) => {
  res.send("Results Service Running");
});

// Route: Get analytics results
app.get("/results", async (req, res) => {
  try {
    const results = await Analytics.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics data", error });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Results service running on port ${PORT}`));
