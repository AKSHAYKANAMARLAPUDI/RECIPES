import React, { useEffect, useState } from "react";

function RecipeTable() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeTable;
