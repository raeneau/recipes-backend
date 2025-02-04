-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    profile_visibility VARCHAR(50) CHECK (profile_visibility IN ('public', 'friends-only', 'private')) DEFAULT 'friends-only',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes Table
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(300),
    meal_type VARCHAR(50) CHECK (meal_type IN ('snack', 'meal', 'side dish', 'appetizer', 'dessert')),
    prep_time INTEGER CHECK (prep_time >= 0),
    cook_time INTEGER CHECK (cook_time >= 0),
    extra_time INTEGER CHECK (extra_time >= 0),
    total_time INTEGER GENERATED ALWAYS AS (prep_time + cook_time + extra_time) STORED,
    difficulty VARCHAR(50) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    cuisine VARCHAR(50),
    servings INTEGER CHECK (servings > 0),
    directions TEXT NOT NULL,
    source_url TEXT,
    special_tools TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients Table
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(50) CHECK (category IN ('meat', 'dairy', 'produce', 'pantry')),
    substitutes TEXT[]
);

-- Recipe Ingredients Table (Many-to-Many Relationship)
CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) CHECK (amount >= 0),
    measurement VARCHAR(50),
    is_optional BOOLEAN DEFAULT FALSE
);

-- User Recipe Interactions
CREATE TABLE user_recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    times_made INTEGER DEFAULT 0 CHECK (times_made >= 0),
    last_made TIMESTAMP,
    notes TEXT
);

-- User Recipe Time Logs
CREATE TABLE user_recipe_times (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_recipe_id UUID REFERENCES user_recipes(id) ON DELETE CASCADE,
    made_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    prep_time INTEGER CHECK (prep_time >= 0),
    cook_time INTEGER CHECK (cook_time >= 0),
    total_time INTEGER GENERATED ALWAYS AS (prep_time + cook_time) STORED
);

-- Community Recipe Reviews
CREATE TABLE recipe_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    rating DECIMAL(2,1) CHECK (rating BETWEEN 0 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe Tags (For Allergens & Diet Tags)
CREATE TABLE recipe_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    tag_type VARCHAR(50) CHECK (tag_type IN ('allergen', 'diet')),
    tag_value VARCHAR(50) NOT NULL
);

-- Recipe Books (User-Created Recipe Collections)
CREATE TABLE recipe_books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Recipe Book Entries (Mapping Recipes to Recipe Books)
CREATE TABLE recipe_book_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_book_id UUID REFERENCES recipe_books(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE
);

-- Friendships (User-to-User Relationships)
CREATE TABLE friends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
    user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('pending', 'accepted', 'blocked')) DEFAULT 'pending'
);

-- Recipe Shares (Tracking Recipe Sharing)
CREATE TABLE recipe_shares (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    platform VARCHAR(50) CHECK (platform IN ('social_media', 'messaging', 'website')),
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
