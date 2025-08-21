const express = require("express");
const router = express.Router();
const { getRecipes, searchRecipes } = require("../controllers/recipeController");

router.get("/", getRecipes);
router.get("/search", searchRecipes);

module.exports = router;
