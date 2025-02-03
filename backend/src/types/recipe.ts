import { z } from 'zod';

/**
 * Recipe schema validation using Zod
 */
export const RecipeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Recipe name is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  favorite: z.boolean(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export type CreateRecipeDTO = Omit<Recipe, 'id'>;
export type UpdateRecipeDTO = Partial<CreateRecipeDTO>; 