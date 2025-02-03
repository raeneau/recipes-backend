/**
 * Recipe type definition
 * Represents a recipe in our application
 */
export interface Recipe {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  favorite: boolean;
} 