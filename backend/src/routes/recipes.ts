import { Router } from 'express';
import { RecipeSchema } from '../types/recipe';
import pool from '../config/database';
import { QueryResult } from 'pg';

const router = Router();

/**
 * GET /api/recipes
 * Retrieve all recipes
 */
router.get('/', async (req, res) => {
  try {
    const result: QueryResult = await pool.query('SELECT * FROM recipes ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/recipes
 * Create a new recipe
 */
router.post('/', async (req, res) => {
  try {
    const validatedData = RecipeSchema.omit({ id: true }).parse(req.body);
    const { name, difficulty, favorite } = validatedData;
    
    const result = await pool.query(
      'INSERT INTO recipes (name, difficulty, favorite) VALUES ($1, $2, $3) RETURNING *',
      [name, difficulty, favorite]
    );
    
    res.status(201).json(result.rows[0]);
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

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 