# Raecipes - Backend API

A robust REST API backend for the Raecipes recipe management application.

## Description

The Raecipes backend provides a comprehensive API for managing recipes, ingredients, user interactions, and recipe collections. Built with modern TypeScript and PostgreSQL, it offers a scalable and type-safe foundation for the recipe management system.

## Features

- RESTful API endpoints for recipe management
- Advanced recipe search and filtering
- User authentication and authorization
- Recipe sharing and social features
- Database migrations and seeding
- Comprehensive data validation
- Type-safe database operations

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: OpenAPI/Swagger (coming soon)
- **Validation**: Zod
- **Development Tools**:
  - ESLint for code linting
  - Jest for testing
  - ts-node-dev for development
  - Prisma Studio for database management

## Database Schema

The application uses a normalized PostgreSQL database with the following main entities:

- Users
- Recipes
- Ingredients
- Recipe Ingredients
- Recipe Books
- Recipe Reviews
- Recipe Tags
- User Interactions

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Set up the database:

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE recipe_app;"

# Apply the schema
psql -U postgres -d recipe_app -f src/config/schema.sql

# Add sample data (optional)
psql -U postgres -d recipe_app -f src/config/sample_data.sql
```

3. Start the development server:

```bash
pnpm dev
```

The server will be running at [http://localhost:3001](http://localhost:3001).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3001
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=recipe_app
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<your_password>
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/recipe_app?schema=public"
```

## Development

This application was developed with assistance from:

- Cursor AI-powered IDE
- ChatGPT for code suggestions and problem-solving
- Best practices from the Node.js and PostgreSQL communities

## API Documentation

API documentation will be available at `/api-docs` once implemented.
