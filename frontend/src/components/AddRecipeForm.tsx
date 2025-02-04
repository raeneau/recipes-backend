'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Form validation schema using Zod
 */
const recipeFormSchema = z.object({
  name: z.string()
    .min(1, 'Recipe name is required')
    .max(100, 'Recipe name must be less than 100 characters'),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    required_error: 'Please select a difficulty level',
  }),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .optional(),
});

type RecipeFormData = z.infer<typeof recipeFormSchema>;

interface AddRecipeFormProps {
  onAdd: (recipe: RecipeFormData) => void;
}

/**
 * AddRecipeForm component - Handles the creation of new recipes
 * Uses React Hook Form for form state management and validation
 */
const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ onAdd }) => {
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
    },
  });

  const onSubmit = async (data: RecipeFormData) => {
    alert(`Submitted with ${JSON.stringify(data, null, 2)}`);
    reset();
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

        {/* Difficulty Field */}
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
          {errors.difficulty && (
            <p className="mt-1 text-sm text-red-400">{errors.difficulty.message}</p>
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