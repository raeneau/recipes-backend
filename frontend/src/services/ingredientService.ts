import { Ingredient, CreateIngredientDTO } from '../types/Recipe';

const API_URL = 'http://localhost:3001/api';

/**
 * Service for handling ingredient-related API calls
 */
export const ingredientService = {
  /**
   * Search for ingredients by name
   */
  async searchIngredients(query: string): Promise<Ingredient[]> {
    const response = await fetch(`${API_URL}/recipes/ingredients/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search ingredients');
    }
    return response.json();
  },

  /**
   * Create a new ingredient or get existing one
   */
  async createIngredient(ingredient: CreateIngredientDTO): Promise<Ingredient> {
    const response = await fetch(`${API_URL}/recipes/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredient),
    });
    if (!response.ok) {
      throw new Error('Failed to create ingredient');
    }
    return response.json();
  },
}; 