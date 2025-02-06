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
  directions: z.string().min(1, 'Directions are required'),
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
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Recipe Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="input"
            placeholder="Enter recipe name"
          />
          {errors.name && (
            <p className="form-error">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={3}
            className="input"
            placeholder="Brief description of your recipe"
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>

        {/* Recipe Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Meal Type */}
          <div className="form-group">
            <label htmlFor="meal_type" className="form-label">
              Meal Type
            </label>
            <select
              id="meal_type"
              {...register('meal_type')}
              className="input"
            >
              {Object.entries(MealType).map(([key, value]) => (
                <option key={value} value={value}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="form-group">
            <label htmlFor="difficulty" className="form-label">
              Difficulty
            </label>
            <select
              id="difficulty"
              {...register('difficulty')}
              className="input"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Prep Time */}
          <div className="form-group">
            <label htmlFor="prep_time" className="form-label">
              Prep Time (minutes)
            </label>
            <input
              type="number"
              id="prep_time"
              {...register('prep_time', { valueAsNumber: true })}
              min="0"
              className="input"
            />
          </div>

          {/* Cook Time */}
          <div className="form-group">
            <label htmlFor="cook_time" className="form-label">
              Cook Time (minutes)
            </label>
            <input
              type="number"
              id="cook_time"
              {...register('cook_time', { valueAsNumber: true })}
              min="0"
              className="input"
            />
          </div>

          {/* Servings */}
          <div className="form-group">
            <label htmlFor="servings" className="form-label">
              Servings
            </label>
            <input
              type="number"
              id="servings"
              {...register('servings', { valueAsNumber: true })}
              min="1"
              className="input"
            />
          </div>

          {/* Cuisine */}
          <div className="form-group">
            <label htmlFor="cuisine" className="form-label">
              Cuisine
            </label>
            <input
              type="text"
              id="cuisine"
              {...register('cuisine')}
              placeholder="e.g., Italian, Mexican"
              className="input"
            />
          </div>
        </div>

        {/* Directions */}
        <div className="form-group">
          <label htmlFor="directions" className="form-label">
            Directions
          </label>
          <textarea
            id="directions"
            {...register('directions')}
            rows={4}
            className="input"
            placeholder="Step by step instructions for your recipe"
          />
          {errors.directions && (
            <p className="form-error">{errors.directions.message}</p>
          )}
        </div>

        {/* Source URL */}
        <div className="form-group">
          <label htmlFor="source_url" className="form-label">
            Source URL
          </label>
          <input
            type="url"
            id="source_url"
            {...register('source_url')}
            placeholder="https://example.com/recipe"
            className="input"
          />
          {errors.source_url && (
            <p className="form-error">{errors.source_url.message}</p>
          )}
        </div>

        {/* Ingredients Section */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Ingredients
          </h3>
          
          {/* Ingredient List */}
          {ingredients.length > 0 && (
            <div className="mb-6 space-y-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {ingredient.name}
                    </span>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      {ingredient.amount && ingredient.measurement && 
                        `${ingredient.amount} ${ingredient.measurement}`}
                      {ingredient.is_optional && ' (Optional)'}
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 capitalize">
                      {ingredient.category}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="p-1 text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 transition-colors"
                    aria-label="Remove ingredient"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Ingredient Form */}
          <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
            <AddIngredientForm onAdd={handleAddIngredient} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Recipe...
              </span>
            ) : (
              'Add Recipe'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm; 