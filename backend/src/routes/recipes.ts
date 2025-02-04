import { Router } from 'express';
import { RecipeSchema, Ingredient } from '../types/recipe';
import pool from '../config/database';
import { QueryResult } from 'pg';

const router = Router();

/**
 * GET /api/recipes
 * Retrieve all recipes with their ingredients
 */
router.get('/', async (req, res) => {
  try {
    // First get all recipes
    const recipesResult: QueryResult = await pool.query(`
      SELECT * FROM recipes ORDER BY name ASC
    `);

    // Then get all ingredients for these recipes
    const ingredientsResult: QueryResult = await pool.query(`
      SELECT ri.* 
      FROM recipe_ingredients ri
      INNER JOIN recipes r ON r.id = ri.recipe_id
      ORDER BY ri.recipe_id, ri.name ASC
    `);

    // Combine recipes with their ingredients
    const recipes = recipesResult.rows.map(recipe => ({
      ...recipe,
      ingredients: ingredientsResult.rows.filter(
        ingredient => ingredient.recipe_id === recipe.id
      ).map(ingredient => ({
        id: ingredient.id,
        name: ingredient.name,
        category: ingredient.category,
        amount: ingredient.amount,
        unit: ingredient.unit,
        isOptional: ingredient.is_optional
      }))
    }));

    res.json(recipes);
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
    const validatedData = RecipeSchema.parse(req.body);
    const { name, difficulty, favorite, ingredients } = validatedData;
    
    // Start a transaction
    await pool.query('BEGIN');

    try {
      // Insert the recipe first
      const recipeResult = await pool.query(
        'INSERT INTO recipes (name, difficulty, favorite) VALUES ($1, $2, $3) RETURNING *',
        [name, difficulty, favorite]
      );
      
      const recipe = recipeResult.rows[0];

      // Insert all ingredients
      if (ingredients && ingredients.length > 0) {
        // Create parameterized query for multiple ingredients
        const values = ingredients.map((_, index) => {
          const offset = index * 6;
          return `($1, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`;
        }).join(', ');

        const params = [recipe.id];
        ingredients.forEach((ingredient: Ingredient) => {
          params.push(
            ingredient.name,
            ingredient.category,
            ingredient.amount || null,
            ingredient.unit,
            ingredient.isOptional || false
          );
        });

        const ingredientsResult = await pool.query(`
          INSERT INTO recipe_ingredients 
          (recipe_id, name, category, amount, unit, is_optional)
          VALUES ${values}
          RETURNING *
        `, params);

        recipe.ingredients = ingredientsResult.rows.map(ingredient => ({
          id: ingredient.id,
          name: ingredient.name,
          category: ingredient.category,
          amount: ingredient.amount,
          unit: ingredient.unit,
          isOptional: ingredient.is_optional
        }));
      } else {
        recipe.ingredients = [];
      }

      await pool.query('COMMIT');
      res.status(201).json(recipe);
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

/**
 * PATCH /api/recipes/:id
 * Update a recipe's favorite status
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result = await pool.query(
      'UPDATE recipes SET favorite = $1 WHERE id = $2 RETURNING *',
      [favorite, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    // Get the ingredients for this recipe
    const ingredientsResult = await pool.query(
      'SELECT * FROM recipe_ingredients WHERE recipe_id = $1',
      [id]
    );

    const recipe = {
      ...result.rows[0],
      ingredients: ingredientsResult.rows.map(ingredient => ({
        id: ingredient.id,
        name: ingredient.name,
        category: ingredient.category,
        amount: ingredient.amount,
        unit: ingredient.unit,
        isOptional: ingredient.is_optional
      }))
    };

    res.json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 