'use client';

import { Recipe } from '../types/Recipe';
import IngredientList from './IngredientList';

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
}

/**
 * RecipeList Component
 * Displays a list of recipes with their details, ingredients, and favorite status
 */
const RecipeList = ({ recipes, onToggleFavorite }: RecipeListProps) => {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-white">My Recipes</h2>
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex justify-between items-start mb-4">
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
                onClick={() => recipe.id && onToggleFavorite(recipe.id)}
                className="text-2xl focus:outline-none"
                aria-label={recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {recipe.favorite ? '⭐' : '☆'}
              </button>
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
                          {ingredient.amount && `${ingredient.amount} ${ingredient.unit}`}
                          {!ingredient.amount && ingredient.unit === 'to taste' && 'To taste'}
                          {ingredient.isOptional && ' (Optional)'}
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