'use client';

import { useState } from 'react';
import { Recipe, MealType } from '../types/Recipe';
import { recipeService } from '../services/recipeService';

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
    if (recipe.id) {
      setEditingId(recipe.id);
      setEditForm(recipe);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = async (recipe: Recipe) => {
    if (!editForm || !recipe.id) return;

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

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-neutral-600 dark:text-neutral-400">
          No recipes yet
        </h3>
        <p className="mt-2 text-neutral-500 dark:text-neutral-500">
          Add your first recipe to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="container-custom">
      <h2 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">
        My Recipes
      </h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card animate-fade-in">
            {editingId === recipe.id ? (
              // Edit Mode
              <div className="p-6 space-y-6">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={editForm?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select
                      value={editForm?.difficulty || 'medium'}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                      className="input"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Meal Type</label>
                    <select
                      value={editForm?.meal_type || ''}
                      onChange={(e) => handleInputChange('meal_type', e.target.value)}
                      className="input"
                    >
                      {Object.entries(MealType).map(([key, value]) => (
                        <option key={value} value={value}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Prep Time (min)</label>
                    <input
                      type="number"
                      value={editForm?.prep_time || ''}
                      onChange={(e) => handleInputChange('prep_time', e.target.value ? Number(e.target.value) : null)}
                      min="0"
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cook Time (min)</label>
                    <input
                      type="number"
                      value={editForm?.cook_time || ''}
                      onChange={(e) => handleInputChange('cook_time', e.target.value ? Number(e.target.value) : null)}
                      min="0"
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    value={editForm?.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="input"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(recipe)}
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="recipe-card-header">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      {recipe.name}
                    </h3>
                    <button
                      onClick={() => handleEdit(recipe)}
                      className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className={`badge badge-${recipe.difficulty}`}>
                      {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                    </span>
                    {recipe.meal_type && (
                      <span className="badge bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                        {recipe.meal_type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="recipe-card-content">
                  {recipe.description && (
                    <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {recipe.description}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    {recipe.prep_time && recipe.prep_time > 0 && (
                      <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                        <span className="font-medium">Prep:</span>
                        <span className="ml-1">{formatTime(recipe.prep_time)}</span>
                      </div>
                    )}
                    <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                      <span className="font-medium">Total:</span>
                      <span className="ml-1">{formatTime(calculateTotalTime(recipe))}</span>
                    </div>
                  </div>
                </div>

                {recipe.ingredients && recipe.ingredients.length > 0 && (
                  <div className="recipe-card-footer">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
                      Ingredients ({recipe.ingredients.length})
                    </h4>
                    <div className="ingredient-list">
                      {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <div
                          key={ingredient.id || index}
                          className="ingredient-item"
                        >
                          <span className="text-sm text-neutral-800 dark:text-neutral-200">
                            {ingredient.name}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {ingredient.amount && ingredient.measurement
                              ? `${ingredient.amount} ${ingredient.measurement}`
                              : ingredient.category}
                          </span>
                        </div>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <div className="py-2 text-center text-sm text-primary-600 dark:text-primary-400">
                          +{recipe.ingredients.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList; 