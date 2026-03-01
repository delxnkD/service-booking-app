const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(5000, () => console.log("Server running on port 5000"));