'use client';

import { useState } from 'react';
import { Recipe } from '../types/Recipe';

interface AddRecipeFormProps {
  onAdd: (recipe: Omit<Recipe, 'id'>) => void;
}

/**
 * AddRecipeForm Component
 * Form for adding new recipes with name and difficulty
 */
const AddRecipeForm = ({ onAdd }: AddRecipeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>('Easy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({
        name: name.trim(),
        difficulty,
        favorite: false,
      });
      setName('');
      setDifficulty('Easy');
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8">
      {isOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Recipe Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-900">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Recipe['difficulty'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
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