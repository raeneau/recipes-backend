-- Sample Users
INSERT INTO users (id, username, email, password_hash, profile_visibility)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'john_doe', 'john@example.com', 'hashed_password_1', 'public'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'jane_smith', 'jane@example.com', 'hashed_password_2', 'friends-only');

-- Sample Recipes
INSERT INTO recipes (
  id, user_id, name, description, meal_type, prep_time, cook_time, 
  difficulty, cuisine, servings, directions, source_url, special_tools
)
VALUES 
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Classic Spaghetti Carbonara',
    'A creamy Italian pasta dish with eggs and pancetta',
    'meal',
    15,
    20,
    'medium',
    'Italian',
    4,
    '1. Boil pasta until al dente\n2. Cook pancetta until crispy\n3. Mix eggs, cheese, and pepper\n4. Combine all ingredients',
    'https://example.com/carbonara',
    ARRAY['Large pot', 'Tongs']
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Garden Fresh Salad',
    'Light and refreshing salad with seasonal vegetables',
    'side dish',
    10,
    0,
    'easy',
    'American',
    2,
    '1. Wash and chop vegetables\n2. Make dressing\n3. Toss together and serve',
    NULL,
    ARRAY['Sharp knife', 'Salad spinner']
  );

-- Sample Ingredients
INSERT INTO ingredients (id, name, category)
VALUES 
  ('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Spaghetti', 'pantry'),
  ('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Eggs', 'dairy'),
  ('30eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'Pancetta', 'meat'),
  ('40eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Parmesan Cheese', 'dairy'),
  ('50eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Mixed Greens', 'produce'),
  ('60eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Cherry Tomatoes', 'produce'),
  ('70eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Cucumber', 'produce'),
  ('80eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Olive Oil', 'pantry');

-- Sample Recipe Ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount, measurement, is_optional)
VALUES 
  -- Carbonara ingredients
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '10eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 1, 'pound', false),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '20eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 4, 'piece', false),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '30eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 0.5, 'pound', false),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 1, 'cup', false),
  -- Salad ingredients
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '50eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 4, 'cup', false),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '60eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 1, 'cup', false),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '70eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 1, 'piece', true),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', '80eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 2, 'tablespoon', false);

-- Sample User Recipe Interactions
INSERT INTO user_recipes (user_id, recipe_id, rating, times_made, notes)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 4.5, 3, 'Family favorite!'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 5.0, 1, 'Perfect summer salad');

-- Sample Recipe Reviews
INSERT INTO recipe_reviews (user_id, recipe_id, rating, review_text)
VALUES 
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 4.0, 'Great recipe! I added some garlic.'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 5.0, 'Simple and delicious!');

-- Sample Recipe Tags
INSERT INTO recipe_tags (recipe_id, tag_type, tag_value)
VALUES 
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'diet', 'vegetarian'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'diet', 'vegan'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'allergen', 'nut-free');

-- Sample Recipe Books
INSERT INTO recipe_books (id, user_id, name, description)
VALUES 
  ('90eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Italian Favorites', 'My collection of Italian recipes'),
  ('11eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Quick & Easy', 'Recipes ready in 30 minutes or less');

-- Sample Recipe Book Entries
INSERT INTO recipe_book_entries (recipe_book_id, recipe_id)
VALUES 
  ('90eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('11eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14');

-- Sample Friendships
INSERT INTO friends (user1_id, user2_id, status)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'accepted');

-- Sample Recipe Shares
INSERT INTO recipe_shares (user_id, recipe_id, platform)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'social_media'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'messaging'); 