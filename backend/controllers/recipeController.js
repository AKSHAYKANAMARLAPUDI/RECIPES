const Recipe = require("../models/Recipe");

// Get Recipes (Paginated + Sorted by rating)
exports.getRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Recipe.countDocuments();
  const data = await Recipe.find()
    .sort({ rating: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ page, limit, total, data });
};

// Search Recipes
exports.searchRecipes = async (req, res) => {
  let filter = {};
  const { title, cuisine, total_time, rating, calories } = req.query;

  if (title) filter.title = { $regex: title, $options: "i" };
  if (cuisine) filter.cuisine = cuisine;

  if (total_time) {
    const op = total_time.slice(0, 2);
    const val = parseInt(total_time.slice(2));
    filter.total_time = { [op === "<=" ? "$lte" : op === ">=" ? "$gte" : "$eq"]: val };
  }
  if (rating) {
    const op = rating.slice(0, 2);
    const val = parseFloat(rating.slice(2));
    filter.rating = { [op === "<=" ? "$lte" : op === ">=" ? "$gte" : "$eq"]: val };
  }
  if (calories) {
    const op = calories.slice(0, 2);
    const val = parseInt(calories.slice(2));
    filter["nutrients.calories"] = { [op === "<=" ? "$lte" : op === ">=" ? "$gte" : "$eq"]: val };
  }

  const data = await Recipe.find(filter);
  res.json({ data });
};
