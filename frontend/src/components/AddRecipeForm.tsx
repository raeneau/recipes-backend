'use client';

import { useState } from 'react';
import { Recipe, Ingredient, MealType } from '../types/Recipe';
import IngredientList from './IngredientList';

interface AddRecipeFormProps {
  onAdd: (recipe: Omit<Recipe, 'id'>) => void;
}

/**
 * AddRecipeForm Component
 * Form for adding new recipes with all required fields from the database schema
 */
const AddRecipeForm = ({ onAdd }: AddRecipeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mealType, setMealType] = useState<string>('meal');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [extraTime, setExtraTime] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [cuisine, setCuisine] = useState('');
  const [servings, setServings] = useState('');
  const [directions, setDirections] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [specialTools, setSpecialTools] = useState('');
  const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id'>[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !directions.trim()) {
      setError('Recipe name and directions are required');
      return;
    }

    onAdd({
      name: name.trim(),
      description: description.trim() || undefined,
      meal_type: mealType as MealType,
      prep_time: prepTime ? parseInt(prepTime) : undefined,
      cook_time: cookTime ? parseInt(cookTime) : undefined,
      extra_time: extraTime ? parseInt(extraTime) : undefined,
      difficulty,
      cuisine: cuisine.trim() || undefined,
      servings: servings ? parseInt(servings) : undefined,
      directions: directions.trim(),
      source_url: sourceUrl.trim() || undefined,
      special_tools: specialTools.split(',').map(tool => tool.trim()).filter(Boolean),
      ingredients: ingredients.map(ingredient => ({
        ...ingredient,
        is_optional: false
      })),
    });

    // Reset form
    setName('');
    setDescription('');
    setMealType('meal');
    setPrepTime('');
    setCookTime('');
    setExtraTime('');
    setDifficulty('easy');
    setCuisine('');
    setServings('');
    setDirections('');
    setSourceUrl('');
    setSpecialTools('');
    setIngredients([]);
    setError('');
    setIsOpen(false);
  };

  const handleAddIngredient = (ingredient: Omit<Ingredient, 'id'>) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500";
  const selectClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900";

  return (
    <div className="fixed bottom-8 right-8">
      {isOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-lg border max-w-2xl overflow-y-auto max-h-[90vh]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-600 font-medium text-sm">{error}</div>
            )}
            
            <div>
              <label htmlFor="recipe-name" className="block text-sm font-semibold text-gray-900">
                Recipe Name *
              </label>
              <input
                type="text"
                id="recipe-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter recipe name"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="recipe-description" className="block text-sm font-semibold text-gray-900">
                Description
              </label>
              <textarea
                id="recipe-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter recipe description"
                className={inputClasses}
                maxLength={300}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="meal-type" className="block text-sm font-semibold text-gray-900">
                  Meal Type
                </label>
                <select
                  id="meal-type"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className={selectClasses}
                >
                  {Object.entries(MealType).map(([key, value]) => (
                    <option key={value} value={value}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-900">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                  className={selectClasses}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="prep-time" className="block text-sm font-semibold text-gray-900">
                  Prep Time (mins)
                </label>
                <input
                  type="number"
                  id="prep-time"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  min="0"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="cook-time" className="block text-sm font-semibold text-gray-900">
                  Cook Time (mins)
                </label>
                <input
                  type="number"
                  id="cook-time"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  min="0"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="extra-time" className="block text-sm font-semibold text-gray-900">
                  Extra Time (mins)
                </label>
                <input
                  type="number"
                  id="extra-time"
                  value={extraTime}
                  onChange={(e) => setExtraTime(e.target.value)}
                  min="0"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cuisine" className="block text-sm font-semibold text-gray-900">
                  Cuisine
                </label>
                <input
                  type="text"
                  id="cuisine"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  placeholder="e.g., Italian, Mexican"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="servings" className="block text-sm font-semibold text-gray-900">
                  Servings
                </label>
                <input
                  type="number"
                  id="servings"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  min="1"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="directions" className="block text-sm font-semibold text-gray-900">
                Directions *
              </label>
              <textarea
                id="directions"
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
                placeholder="Enter recipe directions"
                className={inputClasses}
                rows={5}
                required
              />
            </div>

            <div>
              <label htmlFor="source-url" className="block text-sm font-semibold text-gray-900">
                Source URL
              </label>
              <input
                type="url"
                id="source-url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://example.com/recipe"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="special-tools" className="block text-sm font-semibold text-gray-900">
                Special Tools
              </label>
              <input
                type="text"
                id="special-tools"
                value={specialTools}
                onChange={(e) => setSpecialTools(e.target.value)}
                placeholder="Enter tools separated by commas"
                className={inputClasses}
              />
            </div>

            <IngredientList
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              isEditing={true}
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          + Add Recipe
        </button>
      )}
    </div>
  );
};

export default AddRecipeForm; 