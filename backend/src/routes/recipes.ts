import { Router } from 'express';
import { Recipe, RecipeSchema } from '../types/recipe';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const router = Router();

/**
 * GET /api/recipes/ingredients/search?query=:query
 * Search for ingredients by name
 */
router.get('/ingredients/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const ingredients = await prisma.ingredients.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'  // Case-insensitive search
        }
      },
      take: 5  // Limit results to 5 matches
    });

    res.json(ingredients);
  } catch (error) {
    console.error('Error searching ingredients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/recipes/ingredients
 * Create a new ingredient if it doesn't exist
 */
router.post('/ingredients', async (req, res) => {
  try {
    const { name, category } = req.body;

    // Check if ingredient already exists
    const existingIngredient = await prisma.ingredients.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'  // Case-insensitive check
        }
      }
    });

    if (existingIngredient) {
      return res.json(existingIngredient);
    }

    // Create new ingredient
    const ingredient = await prisma.ingredients.create({
      data: {
        name,
        category
      }
    });

    res.status(201).json(ingredient);
  } catch (error) {
    console.error('Error creating ingredient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

/**
 * POST /api/recipes
 * Create a new recipe with ingredients
 */
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validatedData = RecipeSchema.omit({ id: true }).parse(req.body);

    // Process ingredients - create new ones if needed
    const processedIngredients = await Promise.all(
      validatedData.ingredients.map(async (ingredient) => {
        let ingredientId = ingredient.ingredient_id;

        // If no ingredient_id, try to find or create the ingredient
        if (!ingredientId) {
          const existingOrNew = await prisma.ingredients.upsert({
            where: {
              name: ingredient.name,
            },
            update: {},  // No updates if it exists
            create: {
              name: ingredient.name,
              category: ingredient.category,
            },
          });
          ingredientId = existingOrNew.id;
        }

        return {
          amount: ingredient.amount,
          measurement: ingredient.measurement,
          is_optional: ingredient.is_optional,
          ingredients: {
            connect: {
              id: ingredientId
            }
          }
        };
      })
    );

    // Create recipe with processed ingredients
    const recipe = await prisma.recipes.create({
      data: {
        name: validatedData.name,
        description: validatedData.description || null,
        difficulty: validatedData.difficulty,
        meal_type: validatedData.meal_type || null,
        prep_time: validatedData.prep_time || null,
        cook_time: validatedData.cook_time || null,
        extra_time: validatedData.extra_time || null,
        cuisine: validatedData.cuisine || null,
        servings: validatedData.servings || null,
        directions: validatedData.directions || '',  // Provide empty string as fallback
        source_url: validatedData.source_url || null,
        special_tools: validatedData.special_tools || [],
        recipe_ingredients: {
          create: processedIngredients
        }
      },
      include: {
        recipe_ingredients: {
          include: {
            ingredients: true
          }
        }
      }
    });

    type RecipeWithIngredients = typeof recipe & {
      recipe_ingredients: Array<{
        id: string;
        ingredient_id: string | null;
        ingredients: {
          name: string;
          category: string | null;
        } | null;
        amount: number | null;
        measurement: string | null;
        is_optional: boolean | null;
      }>;
    };

    const recipeWithIngredients = recipe as RecipeWithIngredients;

    // Transform the response to match our API format
    const formattedRecipe = {
      id: recipeWithIngredients.id,
      name: recipeWithIngredients.name,
      difficulty: recipeWithIngredients.difficulty,
      description: recipeWithIngredients.description,
      meal_type: recipeWithIngredients.meal_type,
      prep_time: recipeWithIngredients.prep_time,
      cook_time: recipeWithIngredients.cook_time,
      extra_time: recipeWithIngredients.extra_time,
      cuisine: recipeWithIngredients.cuisine,
      servings: recipeWithIngredients.servings,
      directions: recipeWithIngredients.directions,
      source_url: recipeWithIngredients.source_url,
      special_tools: recipeWithIngredients.special_tools || [],
      ingredients: recipeWithIngredients.recipe_ingredients.map((ri) => ({
        id: ri.id,
        ingredient_id: ri.ingredient_id || '',
        name: ri.ingredients?.name || '',
        category: ri.ingredients?.category || '',
        amount: ri.amount,
        measurement: ri.measurement,
        is_optional: ri.is_optional || false
      }))
    };

    res.status(201).json(formattedRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid recipe data', details: error.errors });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router; 