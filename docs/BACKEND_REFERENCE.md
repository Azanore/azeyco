# Backend Reference Guide

This document serves as a quick-reference index for the backend codebase. It provides a high-level overview of the file structure and key dependencies.

## File Structure Overview

This section briefly describes the purpose of key directories and files.

- `/`
  - `app.js`: The main server entry point. It initializes the Express application, connects to the database, sets up middleware, and defines routes.
  - `package.json`: Defines project metadata, npm scripts, and lists all dependencies.
- `/config`
  - `db.js`: Contains the reusable logic for establishing a connection to the MongoDB database.
- `/controllers`
  - `userController.js`: Contains the HTTP request handlers for user operations (thin layer that delegates to services).
- `/models`
  - `User.js`: Contains the Mongoose schema for user data with password hashing and validation.
- `/routes`
  - `userRoutes.js`: Contains Express API route definitions for user authentication endpoints.
- `/middleware`
  - `auth.js`: Contains JWT authentication middleware for protecting private routes.
- `/services`
  - `userService.js`: Contains business logic for user operations (registration, authentication, profile management).
  - `jwtService.js`: Contains JWT token generation, verification, and management logic.
- `/utils`
  - `responseUtils.js`: Contains utility functions for consistent API responses (success, error, validation).
- `/validators`
  - `userValidators.js`: Contains centralized validation schemas for user input validation.

## Backend Dependencies

### Production Dependencies

- `bcrypt`: For password hashing and comparison.
- `dotenv`: For loading environment variables from a `.env` file.
- `express`: The web application framework for Node.js.
- `express-validator`: For input validation and sanitization.
- `jsonwebtoken`: For generating and verifying JWT tokens.
- `mongoose`: The Object Data Modeling (ODM) library for MongoDB.

### Development Dependencies

- `nodemon`: Automatically restarts the server during development when file changes are detected.

## Architecture Patterns Implemented

### **Service Layer Pattern**

- Business logic separated from controllers
- `userService.js` handles user operations
- `jwtService.js` handles token operations

### **Utility Functions (DRY Principle)**

- `responseUtils.js` provides consistent API responses
- Eliminates code duplication across controllers

### **Validation Separation**

- `userValidators.js` centralizes validation rules
- Reusable validation schemas

### **Single Responsibility Principle**

- Each file has a single, well-defined purpose
- Controllers handle HTTP requests only
- Services handle business logic only
- Middleware handles request processing only

## API Endpoints

### User Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get current user profile (protected)

## Related Documentation

- For detailed API endpoint specifications, see [API Documentation](API.md).
- For detailed database model structures, see [Database Schema](SCHEMA.md).
