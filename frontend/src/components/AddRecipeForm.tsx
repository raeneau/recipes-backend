'use client';

import { useState } from 'react';
import { Recipe, Ingredient } from '../types/Recipe';
import IngredientList from './IngredientList';

interface AddRecipeFormProps {
  onAdd: (recipe: Omit<Recipe, 'id'>) => void;
}

/**
 * AddRecipeForm Component
 * Form for adding new recipes with name, difficulty, and ingredients
 */
const AddRecipeForm = ({ onAdd }: AddRecipeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>('Easy');
  const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id'>[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({
        name: name.trim(),
        difficulty,
        favorite: false,
        ingredients,
      });
      setName('');
      setDifficulty('Easy');
      setIngredients([]);
      setIsOpen(false);
    }
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
        <div className="bg-white p-6 rounded-lg shadow-lg border max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="recipe-name" className="block text-sm font-semibold text-gray-900">
                Recipe Name
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
              <label htmlFor="recipe-difficulty" className="block text-sm font-semibold text-gray-900">
                Difficulty
              </label>
              <select
                id="recipe-difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Recipe['difficulty'])}
                className={selectClasses}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
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