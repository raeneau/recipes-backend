'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { RecipeIngredient, MealType } from '../types/Recipe';
import AddIngredientForm from './AddIngredientForm';

/**
 * Form validation schema using Zod
 */
const recipeFormSchema = z.object({
  name: z.string()
    .min(1, 'Recipe name is required')
    .max(100, 'Recipe name must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  meal_type: z.nativeEnum(MealType).optional(),
  prep_time: z.number().min(0).optional(),
  cook_time: z.number().min(0).optional(),
  extra_time: z.number().min(0).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    required_error: 'Please select a difficulty level',
  }),
  cuisine: z.string().optional(),
  servings: z.number().positive().optional(),
  directions: z.string().optional(),
  source_url: z.string().url().optional().or(z.literal('')),  // Allow empty string or valid URL
  special_tools: z.array(z.string()).optional(),
});

type RecipeFormData = z.infer<typeof recipeFormSchema>;

interface AddRecipeFormProps {
  onAdd: (recipe: RecipeFormData & { ingredients: RecipeIngredient[] }) => void;
}

/**
 * AddRecipeForm component - Handles the creation of new recipes
 * Uses React Hook Form for form state management and validation
 */
const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ onAdd }) => {
  const [ingredients, setIngredients] = useState<Omit<RecipeIngredient, 'id' | 'ingredient_id'>[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: '',
      difficulty: 'medium',
      description: '',
      meal_type: 'meal',
      prep_time: 0,
      cook_time: 0,
      extra_time: 0,
      servings: 1,
      directions: '',
      special_tools: [],
    },
  });

  const handleAddIngredient = (ingredient: Omit<RecipeIngredient, 'id' | 'ingredient_id'>) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: RecipeFormData) => {
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient to the recipe');
      return;
    }

    try {
      await onAdd({ ...data, ingredients: ingredients as RecipeIngredient[] });
      setIngredients([]);
      reset();
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Failed to create recipe. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">Add New Recipe</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Recipe Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                     shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                     shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        {/* Recipe Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Meal Type */}
          <div>
            <label htmlFor="meal_type" className="block text-sm font-medium text-gray-300">
              Meal Type
            </label>
            <select
              id="meal_type"
              {...register('meal_type')}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                       shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {Object.entries(MealType).map(([key, value]) => (
                <option key={value} value={value}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300">
              Difficulty
            </label>
            <select
              id="difficulty"
              {...register('difficulty')}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                       shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Prep Time */}
          <div>
            <label htmlFor="prep_time" className="block text-sm font-medium text-gray-300">
              Prep Time (minutes)
            </label>
            <input
              type="number"
              id="prep_time"
              {...register('prep_time', { valueAsNumber: true })}
              min="0"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                       shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Cook Time */}
          <div>
            <label htmlFor="cook_time" className="block text-sm font-medium text-gray-300">
              Cook Time (minutes)
            </label>
            <input
              type="number"
              id="cook_time"
              {...register('cook_time', { valueAsNumber: true })}
              min="0"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                       shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Servings */}
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-300">
              Servings
            </label>
            <input
              type="number"
              id="servings"
              {...register('servings', { valueAsNumber: true })}
              min="1"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                       shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Cuisine */}
          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-300">
              Cuisine
            </label>
            <input
              type="text"
              id="cuisine"
              {...register('cuisine')}
              placeholder="e.g., Italian, Mexican"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                       shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Directions */}
        <div>
          <label htmlFor="directions" className="block text-sm font-medium text-gray-300">
            Directions
          </label>
          <textarea
            id="directions"
            {...register('directions')}
            rows={6}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                     shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Source URL */}
        <div>
          <label htmlFor="source_url" className="block text-sm font-medium text-gray-300">
            Source URL
          </label>
          <input
            type="url"
            id="source_url"
            {...register('source_url')}
            placeholder="https://example.com/recipe"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
                     shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Ingredients Section */}
        <div className="border-t border-gray-600 pt-6">
          <h3 className="text-lg font-medium text-white mb-4">Ingredients</h3>
          
          {/* Ingredient List */}
          {ingredients.length > 0 && (
            <div className="mb-4 space-y-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-md"
                >
                  <div className="flex-1">
                    <span className="text-white font-medium">{ingredient.name}</span>
                    <div className="text-sm text-gray-300">
                      {ingredient.amount && ingredient.measurement && 
                        `${ingredient.amount} ${ingredient.measurement}`}
                      {ingredient.is_optional && ' (Optional)'}
                    </div>
                    <span className="text-xs text-gray-400 capitalize">{ingredient.category}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="p-1 text-gray-400 hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Ingredient Form */}
          <div className="bg-gray-700 p-4 rounded-md">
            <AddIngredientForm onAdd={handleAddIngredient} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                   shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm; 