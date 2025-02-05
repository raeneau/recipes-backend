import { Recipe, CreateRecipeDTO } from '../types/Recipe';

const API_URL = 'http://localhost:3001/api';

/**
 * Service for handling recipe-related API calls
 */
export const recipeService = {
  /**
   * Fetch all recipes from the backend
   */
  async getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch(`${API_URL}/recipes`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return response.json();
  },

  /**
   * Create a new recipe with ingredients
   */
  async createRecipe(recipe: CreateRecipeDTO): Promise<Recipe> {
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create recipe');
    }
    
    return response.json();
  },

  /**
   * Update a recipe's favorite status
   */
  async toggleFavorite(id: string, favorite: boolean): Promise<Recipe> {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorite }),
    });
    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }
    return response.json();
  },
}; 