const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) =>
    console.log("MongoDB connection error:", error)
  );

app.get("/", (req, res) => {
  res.send("ApplyMate server is running");
});

app.listen(5000, () => {
  console.log("ApplyMate server started on port 5000");
});