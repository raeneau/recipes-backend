'use client';

import { useState } from 'react';
import { Ingredient, IngredientCategory, MeasurementUnit } from '../types/Recipe';

interface AddIngredientFormProps {
  onAdd: (ingredient: Omit<Ingredient, 'id'>) => void;
}

/**
 * AddIngredientForm Component
 * Form fields for adding new ingredients to a recipe
 */
export default function AddIngredientForm({ onAdd }: AddIngredientFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<IngredientCategory>('pantry');
  const [amount, setAmount] = useState<string>('');
  const [unit, setUnit] = useState<MeasurementUnit>('piece');
  const [isOptional, setIsOptional] = useState(false);
  const [error, setError] = useState('');

  const handleAddClick = () => {
    if (!name.trim()) {
      setError('Ingredient name is required');
      return;
    }

    const newIngredient = {
      name: name.trim(),
      category,
      amount: amount ? Number(amount) : undefined,
      unit,
      isOptional,
    };

    onAdd(newIngredient);

    // Reset fields
    setName('');
    setAmount('');
    setIsOptional(false);
    setError('');
  };

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500";
  const selectClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900";

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="ingredient-name" className="block text-sm font-semibold text-gray-900">
            Name
          </label>
          <input
            type="text"
            id="ingredient-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Enter ingredient name"
            className={`${inputClasses} ${error ? 'border-red-300' : 'border-gray-300'}`}
          />
          {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
        </div>
        
        <div>
          <label htmlFor="ingredient-category" className="block text-sm font-semibold text-gray-900">
            Category
          </label>
          <select
            id="ingredient-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as IngredientCategory)}
            className={selectClasses}
          >
            {Object.entries(IngredientCategory).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ingredient-amount" className="block text-sm font-semibold text-gray-900">
            Amount
          </label>
          <input
            type="number"
            id="ingredient-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            placeholder="Enter amount"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="ingredient-unit" className="block text-sm font-semibold text-gray-900">
            Unit
          </label>
          <select
            id="ingredient-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as MeasurementUnit)}
            className={selectClasses}
          >
            {Object.entries(MeasurementUnit).map(([key, value]) => (
              <option key={value} value={value}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="ingredient-optional"
          checked={isOptional}
          onChange={(e) => setIsOptional(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="ingredient-optional" className="ml-2 block text-sm font-semibold text-gray-900">
          Optional ingredient
        </label>
      </div>

      <button
        type="button"
        onClick={handleAddClick}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Add Ingredient
      </button>
    </div>
  );
} 