'use client';

import { Recipe } from '../types/Recipe';
import IngredientList from './IngredientList';

interface RecipeListProps {
  recipes: Recipe[];
}

/**
 * RecipeList Component
 * Displays a list of recipes with their details and ingredients
 */
const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-white">My Recipes</h2>
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Ingredients</h4>
                <div className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={ingredient.id || index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{ingredient.name}</span>
                        <div className="text-sm text-gray-700">
                          {ingredient.amount && ingredient.measurement && 
                            `${ingredient.amount} ${ingredient.measurement}`}
                          {ingredient.is_optional && ' (Optional)'}
                        </div>
                        <span className="text-xs text-gray-600 capitalize">{ingredient.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList; 