# Raecipes

A modern, full-stack recipe management application built with Next.js, TypeScript, and PostgreSQL.

## Overview

Raecipes is a comprehensive recipe management system that allows users to create, store, organize, and share their favorite recipes. The application is split into two main components:

- [Frontend](./frontend/README.md): A modern Next.js application providing an intuitive user interface
- [Backend](./backend/README.md): A robust Express.js API handling data management and business logic

## Project Structure

```
raecipes/
├── frontend/          # Next.js frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── README.md     # Frontend documentation
│
├── backend/          # Express.js backend API
│   ├── src/         # Source code
│   ├── prisma/      # Database schema and migrations
│   └── README.md    # Backend documentation
│
└── README.md        # This file
```

## Key Features

- Create and manage detailed recipes
- Organize recipes by many categories such as meal type, difficulty, and cuisine
- Track ingredients with measurements
- Share recipes with friends
- Create personal recipe collections
- Rate and review recipes
- Advanced recipe search and filtering
- User authentication and authorization (coming soon)

## Technology Stack

### Frontend

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Hooks for state management (for now)
- Zod for validation

### Backend

- Node.js with Express
- TypeScript
- PostgreSQL database
- Prisma ORM
- RESTful API design
- Comprehensive data validation

## Development

This application was developed using modern AI-assisted development tools and practices:

- **Cursor**: An AI-powered IDE that provided intelligent code suggestions, refactoring assistance, and development guidance throughout the project
- **ChatGPT**: Assisted with:
  - Architecture decisions
  - Code implementation
  - Problem-solving
  - Documentation
  - Best practices

## Getting Started

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   pnpm install
   # Follow backend README for database setup
   pnpm dev
   ```
3. Set up the frontend:
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```
4. Visit [http://localhost:3000](http://localhost:3000) to use the application

For detailed setup instructions, please refer to the README files in the respective directories:

- [Frontend Setup](./frontend/README.md#getting-started)
- [Backend Setup](./backend/README.md#getting-started)
