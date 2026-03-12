const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// SPA catch-all route using regex
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Use Render's PORT environment variable, fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
