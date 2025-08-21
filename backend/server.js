import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/recipesdb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// API routes
app.use("/api/recipes", recipeRoutes);

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
