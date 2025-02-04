import { z } from 'zod';

/**
 * Ingredient category enum
 */
export const IngredientCategory = {
  Meat: 'meat',
  Produce: 'produce',
  Pantry: 'pantry',
  Dairy: 'dairy',
  Spices: 'spices',
  Other: 'other',
} as const;

/**
 * Measurement unit enum
 */
export const MeasurementUnit = {
  Teaspoon: 'teaspoon',
  Tablespoon: 'tablespoon',
  Cup: 'cup',
  Ounce: 'ounce',
  Pound: 'pound',
  Gram: 'gram',
  Kilogram: 'kilogram',
  Milliliter: 'milliliter',
  Liter: 'liter',
  Piece: 'piece',
  Pinch: 'pinch',
  ToTaste: 'to taste',
} as const;

/**
 * Ingredient schema validation
 */
export const IngredientSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Ingredient name is required'),
  category: z.nativeEnum(IngredientCategory),
  amount: z.number().optional(),
  unit: z.nativeEnum(MeasurementUnit),
  isOptional: z.boolean().default(false),
});

/**
 * Recipe schema validation
 */
export const RecipeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Recipe name is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  favorite: z.boolean(),
  ingredients: z.array(IngredientSchema).default([]),
});

export type IngredientCategory = typeof IngredientCategory[keyof typeof IngredientCategory];
export type MeasurementUnit = typeof MeasurementUnit[keyof typeof MeasurementUnit];
export type Ingredient = z.infer<typeof IngredientSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;

export type CreateRecipeDTO = Omit<Recipe, 'id'>;
export type UpdateRecipeDTO = Partial<CreateRecipeDTO>;
export type CreateIngredientDTO = Omit<Ingredient, 'id'>; 