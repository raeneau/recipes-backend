'use client';

import { Ingredient, RecipeIngredient } from '../types/Recipe';
import AddIngredientForm from './AddIngredientForm';

interface IngredientListProps {
  ingredients: RecipeIngredient[];
  onAddIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  onRemoveIngredient?: (index: number) => void;
  isEditing?: boolean;
}

/**
 * IngredientList Component
 * Displays a list of ingredients and provides a form to add new ones
 */
export default function IngredientList({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  isEditing = false,
}: IngredientListProps) {
  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Ingredients</h3>
      
      <div className="space-y-2">
        {ingredients?.map((ingredient, index) => (
          <div
            key={ingredient.id || index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div className="flex-1">
              <span className="font-medium text-gray-900">{ingredient.name}</span>
              <div className="text-sm text-gray-700">
                {ingredient.amount && ingredient.measurement && 
                  `${ingredient.amount} ${ingredient.measurement}`}
                {!ingredient.amount && ingredient.measurement === 'to taste' && 'To taste'}
                {ingredient.is_optional && ' (Optional)'}
              </div>
              <span className="text-xs text-gray-600 capitalize">{ingredient.category}</span>
            </div>
            {isEditing && onRemoveIngredient && (
              <button
                onClick={() => onRemoveIngredient(index)}
                className="p-1 text-red-600 hover:text-red-800"
                aria-label="Remove ingredient"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <AddIngredientForm onAdd={onAddIngredient} />
      )}
    </div>
  );
} 