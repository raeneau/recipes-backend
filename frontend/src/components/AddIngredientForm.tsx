'use client';

import { useState, useEffect, useRef } from 'react';
import { Ingredient, IngredientCategory, MeasurementUnit, RecipeIngredient } from '../types/Recipe';
import { ingredientService } from '../services/ingredientService';
import { useDebounce } from '../hooks/useDebounce';

interface AddIngredientFormProps {
  onAdd: (ingredient: Omit<RecipeIngredient, 'id' | 'ingredient_id'>) => void;
}

/**
 * AddIngredientForm Component
 * Form fields for adding new ingredients to a recipe with search functionality
 */
export default function AddIngredientForm({ onAdd }: AddIngredientFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<IngredientCategory>('pantry');
  const [amount, setAmount] = useState<string>('');
  const [unit, setUnit] = useState<MeasurementUnit>('piece');
  const [isOptional, setIsOptional] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Ingredient[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(name, 300);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search for ingredients when name changes
  useEffect(() => {
    const searchIngredients = async () => {
      if (debouncedSearch.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const results = await ingredientService.searchIngredients(debouncedSearch);
        setSearchResults(results);
        setShowResults(true);
      } catch (err) {
        console.error('Error searching ingredients:', err);
      } finally {
        setIsLoading(false);
      }
    };

    searchIngredients();
  }, [debouncedSearch]);

  const handleSelectIngredient = (ingredient: Ingredient) => {
    setName(ingredient.name);
    setCategory(ingredient.category);
    setShowResults(false);
  };

  const handleAddClick = async () => {
    if (!name.trim()) {
      setError('Ingredient name is required');
      return;
    }

    try {
      // Create or get existing ingredient
      const ingredient = await ingredientService.createIngredient({
        name: name.trim(),
        category,
      });

      // Add to recipe with measurement info
      onAdd({
        ...ingredient,
        amount: amount ? Number(amount) : undefined,
        measurement: unit,
        is_optional: isOptional,
      });

      // Reset form
      setName('');
      setAmount('');
      setIsOptional(false);
      setError('');
      setSearchResults([]);
    } catch (err) {
      setError('Failed to add ingredient. Please try again.');
      console.error('Error adding ingredient:', err);
    }
  };

  const inputClasses = "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder-gray-400";
  const selectClasses = "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Ingredient Name with Search */}
        <div className="relative" ref={searchRef}>
          <label htmlFor="ingredient-name" className="block text-sm font-medium text-gray-300">
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
            placeholder="Search or enter ingredient name"
            className={`${inputClasses} ${error ? 'border-red-300' : 'border-gray-600'}`}
          />
          {error && <p className="mt-1 text-sm text-red-400 font-medium">{error}</p>}
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-gray-700 rounded-md shadow-lg border border-gray-600">
              {searchResults.map((ingredient) => (
                <button
                  key={ingredient.id}
                  onClick={() => handleSelectIngredient(ingredient)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  <span className="font-medium text-white">{ingredient.name}</span>
                  <span className="ml-2 text-sm text-gray-300 capitalize">({ingredient.category})</span>
                </button>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="absolute right-3 top-9">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
            </div>
          )}
        </div>
        
        {/* Category */}
        <div>
          <label htmlFor="ingredient-category" className="block text-sm font-medium text-gray-300">
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

        {/* Amount */}
        <div>
          <label htmlFor="ingredient-amount" className="block text-sm font-medium text-gray-300">
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

        {/* Unit */}
        <div>
          <label htmlFor="ingredient-unit" className="block text-sm font-medium text-gray-300">
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

      {/* Optional Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="ingredient-optional"
          checked={isOptional}
          onChange={(e) => setIsOptional(e.target.checked)}
          className="h-4 w-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
        />
        <label htmlFor="ingredient-optional" className="ml-2 block text-sm font-medium text-gray-300">
          Optional ingredient
        </label>
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAddClick}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Ingredient
      </button>
    </div>
  );
} 