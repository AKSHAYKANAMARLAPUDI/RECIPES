const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  cuisine: String,
  title: String,
  rating: Number,
  prep_time: Number,
  cook_time: Number,
  total_time: Number,
  description: String,
  nutrients: Object,
  serves: String,
}, { timestamps: true });

module.exports = mongoose.model("Recipe", RecipeSchema);
