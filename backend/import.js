const mongoose = require("mongoose");
const fs = require("fs");
const Recipe = require("./models/Recipe");

mongoose.connect("mongodb://localhost:27017/recipesdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

function safeNumber(val) {
  if (val === "NaN" || val === null || Number.isNaN(val)) return null;
  return val;
}

async function importData() {
  let raw = fs.readFileSync("US_recipes.json", "utf-8");

  // 🔥 Replace all NaN with null
  raw = raw.replace(/\bNaN\b/g, "null");

  const parsed = JSON.parse(raw);

  // Make sure we have an array
  const data = Array.isArray(parsed) ? parsed : parsed.recipes;
  if (!data || !Array.isArray(data)) {
    console.error("❌ JSON format is not correct. Expected an array of recipes.");
    process.exit(1);
  }

  const docs = data.map(r => ({
    cuisine: r.cuisine,
    title: r.title,
    rating: safeNumber(r.rating),
    prep_time: safeNumber(r.prep_time),
    cook_time: safeNumber(r.cook_time),
    total_time: safeNumber(r.total_time),
    description: r.description,
    nutrients: r.nutrients,
    serves: r.serves,
  }));

  try {
    await Recipe.deleteMany(); // clear old data
    await Recipe.insertMany(docs);
    console.log("✅ Data Imported Successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
}

importData();
