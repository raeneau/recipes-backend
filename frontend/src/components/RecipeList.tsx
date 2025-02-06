'use client';

import { useState } from 'react';
import { Recipe, MealType } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import IngredientList from './IngredientList';

interface RecipeListProps {
  recipes: Recipe[];
  onUpdate: (updatedRecipe: Recipe) => void;
}

/**
 * Format time in minutes to a readable string
 * @param minutes Time in minutes
 * @returns Formatted time string (e.g., "1h 30m" or "45m")
 */
const formatTime = (minutes: number | null | undefined): string => {
  if (!minutes) return '0m';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}m` : ''}`;
  }
  return `${minutes}m`;
};

/**
 * Calculate total time from prep, cook, and extra time
 * @param recipe Recipe object
 * @returns Total time in minutes
 */
const calculateTotalTime = (recipe: Recipe): number => {
  const prep = recipe.prep_time || 0;
  const cook = recipe.cook_time || 0;
  const extra = recipe.extra_time || 0;
  return prep + cook + extra;
};

/**
 * RecipeList Component
 * Displays a list of recipes with their details and ingredients
 */
const RecipeList = ({ recipes, onUpdate }: RecipeListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Recipe> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (recipe: Recipe) => {
    setEditingId(recipe.id);
    setEditForm(recipe);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = async (recipe: Recipe) => {
    if (!editForm) return;

    try {
      setIsSubmitting(true);
      const updatedRecipe = await recipeService.updateRecipe(recipe.id, editForm);
      onUpdate(updatedRecipe);
      setEditingId(null);
      setEditForm(null);
    } catch (error) {
      console.error('Failed to update recipe:', error);
      alert('Failed to update recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof Recipe,
    value: string | number | null
  ) => {
    if (!editForm) return;

    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
              <div className="space-y-2 flex-1">
                {editingId === recipe.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    {/* Recipe Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200">Name</label>
                      <input
                        type="text"
                        value={editForm?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Recipe Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Difficulty */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                        <select
                          value={editForm?.difficulty || 'medium'}
                          onChange={(e) => handleInputChange('difficulty', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>

                      {/* Meal Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Meal Type</label>
                        <select
                          value={editForm?.meal_type || ''}
                          onChange={(e) => handleInputChange('meal_type', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          {Object.entries(MealType).map(([key, value]) => (
                            <option key={value} value={value}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Prep Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Prep Time (minutes)</label>
                        <input
                          type="number"
                          value={editForm?.prep_time || ''}
                          onChange={(e) => handleInputChange('prep_time', e.target.value ? Number(e.target.value) : null)}
                          min="0"
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Cook Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Cook Time (minutes)</label>
                        <input
                          type="number"
                          value={editForm?.cook_time || ''}
                          onChange={(e) => handleInputChange('cook_time', e.target.value ? Number(e.target.value) : null)}
                          min="0"
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={editForm?.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave(recipe)}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
                      <button
                        onClick={() => handleEdit(recipe)}
                        className="ml-2 text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      {/* Difficulty Badge */}
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                      </span>

                      {/* Prep Time */}
                      {recipe.prep_time && recipe.prep_time > 0 && (
                        <span className="text-sm text-gray-600">
                          <span className="font-medium">Prep:</span> {formatTime(recipe.prep_time)}
                        </span>
                      )}

                      {/* Total Time */}
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Total:</span> {formatTime(calculateTotalTime(recipe))}
                      </span>
                    </div>
                    {recipe.description && (
                      <p className="text-gray-600 mt-2">{recipe.description}</p>
                    )}
                  </>
                )}
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