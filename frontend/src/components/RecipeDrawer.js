import React from 'react';
import { Drawer } from '@mui/material';

const RecipeDrawer = ({ recipe, onClose }) => (
  <Drawer anchor="right" open={!!recipe} onClose={onClose}>
    {recipe && (
      <div className="p-4 w-80">
        <h2 className="text-xl font-bold">{recipe.title}</h2>
        <p className="italic">{recipe.cuisine}</p>
        <p className="mt-2">{recipe.description}</p>
        <div className="mt-2">Total Time: {recipe.total_time || 'N/A'}</div>
        <div className="mt-2">Prep Time: {recipe.prep_time || 'N/A'}, Cook Time: {recipe.cook_time || 'N/A'}</div>
        <h3 className="mt-4 font-semibold">Nutrients</h3>
        <table className="mt-2 border w-full">
          <tbody>
            {recipe.nutrients && Object.entries(recipe.nutrients).map(([key, val]) => (
              <tr key={key}>
                <td className="border px-2">{key}</td>
                <td className="border px-2">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </Drawer>
);

export default RecipeDrawer;
