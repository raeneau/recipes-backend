-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    difficulty VARCHAR(50) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ingredient categories enum
CREATE TYPE ingredient_category AS ENUM (
    'meat', 'produce', 'pantry', 'dairy', 'spices', 'other'
);

-- Create measurement units enum
CREATE TYPE measurement_unit AS ENUM (
    'teaspoon', 'tablespoon', 'cup', 'ounce', 'pound',
    'gram', 'kilogram', 'milliliter', 'liter', 'piece',
    'pinch', 'to taste'
);

-- Create ingredients table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category ingredient_category NOT NULL,
    amount DECIMAL(10, 2),
    unit measurement_unit NOT NULL,
    is_optional BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_recipes_name ON recipes(name);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update the updated_at column
CREATE TRIGGER update_recipes_updated_at
    BEFORE UPDATE ON recipes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipe_ingredients_updated_at
    BEFORE UPDATE ON recipe_ingredients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 