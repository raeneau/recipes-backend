'use client';

import { Recipe } from '../types/Recipe';

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
}

/**
 * RecipeList Component
 * Displays a list of recipes with their details and favorite status
 */
const RecipeList = ({ recipes, onToggleFavorite }: RecipeListProps) => {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">My Recipes</h2>
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
                <span className={`text-sm font-medium ${
                  recipe.difficulty === 'Easy' ? 'text-green-700' :
                  recipe.difficulty === 'Medium' ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              <button
                onClick={() => onToggleFavorite(recipe.id)}
                className="text-2xl focus:outline-none"
                aria-label={recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {recipe.favorite ? '⭐' : '☆'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList; 