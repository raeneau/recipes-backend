'use client';

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Recipe } from '../types/Recipe';
import RecipeList from '../components/RecipeList';
import AddRecipeForm from '../components/AddRecipeForm';
import Navigation from '../components/Navigation';
import Modal from '../components/Modal';
import { recipeService } from '../services/recipeService';

/**
 * Home component - Main landing page of the application
 * Displays a list of recipes and allows adding new ones
 */
const Home: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      setIsAddModalOpen(false);
    } catch (err) {
      setError('Failed to add recipe. Please try again.');
      console.error('Error adding recipe:', err);
    }
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-surface-darker">
      <Navigation />
      
      <main className="py-8">
        <div className="container-custom">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                My Recipes
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Manage and organize your favorite recipes
              </p>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Recipe
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full max-w-2xl mx-auto mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <RecipeList recipes={recipes} onUpdate={handleUpdateRecipe} />
          )}
        </div>
      </main>

      {/* Add Recipe Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Recipe"
        size="lg"
      >
        <AddRecipeForm onAdd={handleAddRecipe} />
      </Modal>
    </div>
  );
};

export default Home;
