'use client';

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Recipe } from '../types/Recipe';
import RecipeList from '../components/RecipeList';
import AddRecipeForm from '../components/AddRecipeForm';
import { recipeService } from '../services/recipeService';

/**
 * Home component - Main landing page of the application
 * Displays a list of recipes and allows adding new ones
 */
const Home: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipes on component mount
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
      console.error('Error loading recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecipe = async (newRecipe: Omit<Recipe, 'id'>) => {
    try {
      const createdRecipe = await recipeService.createRecipe(newRecipe);
      setRecipes(prev => [...prev, createdRecipe]);
      setError(null);
    } catch (err) {
      setError('Failed to add recipe. Please try again.');
      console.error('Error adding recipe:', err);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return;

      const updatedRecipe = await recipeService.toggleFavorite(id, !recipe.favorite);
      setRecipes(prev =>
        prev.map(recipe =>
          recipe.id === id ? updatedRecipe : recipe
        )
      );
      setError(null);
    } catch (err) {
      setError('Failed to update recipe. Please try again.');
      console.error('Error updating recipe:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">My Recipe Collection</h1>
        
        {error && (
          <div className="w-full max-w-2xl mx-auto mb-4 p-4 text-red-100 bg-red-900 bg-opacity-50 rounded-md">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <RecipeList
              recipes={recipes}
              onToggleFavorite={handleToggleFavorite}
            />
            <AddRecipeForm onAdd={handleAddRecipe} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
