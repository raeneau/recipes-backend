import { Router } from 'express';
import { Recipe } from '../types/recipe';
import { prisma } from '../lib/prisma';

const router = Router();

/**
 * GET /api/recipes
 * Retrieve all recipes with their ingredients
 */
router.get('/', async (req, res) => {
  try {
    const recipes = await prisma.recipes.findMany({
      include: {
        recipe_ingredients: {
          include: {
            ingredients: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Transform the data to match our API response format
    const formattedRecipes = recipes.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      difficulty: recipe.difficulty,
      ingredients: recipe.recipe_ingredients
        .filter(ri => ri.ingredients !== null)  // Filter out any null ingredients
        .map(ri => ({
          id: ri.id,
          ingredient_id: ri.ingredient_id,
          name: ri.ingredients!.name,  // We can safely use ! here because of the filter
          category: ri.ingredients!.category,
          amount: ri.amount,
          measurement: ri.measurement,
          is_optional: ri.is_optional
        }))
    }));

    res.json(formattedRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 