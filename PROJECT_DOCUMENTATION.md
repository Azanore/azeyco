# Azeyco

## Overview

- **Brief description:** Azeyco is a modern social networking platform enabling users to connect, share, and engage through posts, comments, and real-time interactions.
- **Core purpose:** To provide a feature-rich, scalable, and safe environment for users to express themselves, discover content, and build communities.
- **Target users:** Individuals seeking a dynamic social experience; solo developers (for learning); potential future collaborators.
- **Important note:** All features will be implemented using only free and open-source technologies. If a paid service is ever unavoidable, it will be flagged immediately and a free workaround or alternative will be suggested. You will always have the option to skip, replace, or modify the feature to avoid any costs.

## Architecture Decisions

- **Tech stack chosen and why:**
  - **Frontend:** React (required; modern, component-based, large ecosystem)
  - **Backend:** Node.js + Express (required; fast, scalable, great with JS full-stack)
  - **Database:** MongoDB (flexible schema, fast iteration, good for social data)
  - **Authentication:** JWT (stateless, REST-friendly, full control)
  - **Real-time:** Socket.IO (easy Node integration, real-time notifications/messaging)
- **Major architectural choices:**
  - Monorepo with separate frontend and backend folders
  - REST API for core features, WebSockets for real-time
  - Modular code organization for scalability
- **Alternatives considered and rejected:**
  - PostgreSQL (strong relational DB, but MongoDB chosen for flexibility)
  - Auth0/Firebase Auth (easy, but less control)
  - Pusher/Ably (external, but Socket.IO gives more control)

## Project Structure

- **Folder organization:**
  - `/frontend` (React app)
  - `/backend` (Node/Express API, Socket.IO, MongoDB models)
  - `/docs` (guides, architecture, API docs, reference files)
  - `/scripts` (setup, utilities)
  - Root: `README.md`, `PROJECT_DOCUMENTATION.md`, `.gitignore`, etc.
- **File naming conventions:**
  - camelCase for JS/TS files, PascalCase for React components
  - kebab-case for config/scripts
- **Code organization patterns:**
  - Feature-based folders in frontend (e.g., `features/posts/`)
  - Modular routers/controllers/services in backend
    - `/config`: For application configuration files (e.g., database connection).
    - `/models`: For Mongoose data models/schemas.
    - `/routes`: For Express API route definitions.
    - `/controllers`: For the business logic that handles API requests.
    - `/services`: For business logic and external service interactions.
    - `/middleware`: For request processing functions.
    - `/utils`: For helper functions and utilities.
    - `/validators`: For input validation schemas.
    - `/uploads`: For file storage (not in git).
- **Documentation organization:**
  - `PROJECT_DOCUMENTATION.md`: Main architectural blueprint and index
  - `/docs/API.md`: Detailed API endpoint specifications
  - `/docs/SCHEMA.md`: Database model specifications
  - `/docs/BACKLOG.md`: Feature backlog and progress tracking
  - `/docs/DECISION_LOG.md`: Historical architectural decisions
  - `/docs/LEARNINGS.md`: Personal learning notes
  - `/docs/BACKEND_REFERENCE.md`: Quick backend file navigation and dependencies
  - `/docs/FRONTEND_REFERENCE.md`: Quick frontend component registry and dependencies

## Development Standards

### **Coding Conventions**

- **Language:** JavaScript only (.js, .jsx). TypeScript will not be used.
- **Formatting:** Prettier + ESLint for formatting/linting
- **Naming Conventions:**
  - **Variables/Functions:** camelCase (`getUserProfile`, `isValidEmail`)
  - **Constants:** UPPER_SNAKE_CASE (`JWT_SECRET`, `MAX_FILE_SIZE`)
  - **Classes:** PascalCase (`UserService`, `PostController`)
  - **Files:** camelCase for JS files, PascalCase for React components
  - **Database Fields:** camelCase (`firstName`, `profilePicture`)
- **Comments:** JSDoc for functions, inline comments for complex logic
- **Error Handling:** Consistent error response format across all endpoints

### **SOLID Principles**

- **S - Single Responsibility:** Each function/class should do one thing well
- **O - Open/Closed:** Open for extension, closed for modification
- **L - Liskov Substitution:** Derived classes must be substitutable for base classes
- **I - Interface Segregation:** Don't force clients to depend on unused interfaces
- **D - Dependency Inversion:** Depend on abstractions, not concrete implementations

### **DRY (Don't Repeat Yourself)**

- **Reusable Functions:** Extract common logic into utility functions
- **Shared Components:** Create reusable UI components for common elements
- **Common Patterns:** Standardize error handling, validation, and response formats

### **Design Patterns**

#### **Backend Patterns**

- **MVC Pattern:** Models (data), Views (API responses), Controllers (request handling)
- **Service Layer:** Business logic separate from controllers
- **Repository Pattern:** Abstract database operations
- **Middleware Pattern:** Reusable request processing functions
- **Factory Pattern:** For creating complex objects (e.g., different post types)

#### **Frontend Patterns**

- **Component Composition:** Build complex components from simple ones
- **Custom Hooks:** Reusable stateful logic
- **State Management:** Context Pattern (built-in) or Redux (external library)
- **Render Props/HOC:** For component logic reuse

### **Code Organization**

#### **Backend Structure**

```
/backend
├── /config/          # Configuration files
├── /controllers/     # Request handlers (thin layer)
├── /services/        # Business logic
├── /models/          # Data models and schemas
├── /routes/          # Route definitions
├── /middleware/      # Request processing functions
├── /utils/           # Helper functions and utilities
├── /validators/      # Input validation schemas
└── /uploads/         # File storage (not in git)
    ├── /profile-pictures
    └── /cover-pictures
```

#### **Frontend Structure**

```
/frontend/src
├── /components/      # Reusable UI components
├── /features/        # Feature-based organization
├── /hooks/           # Custom React hooks
├── /context/         # React context providers
├── /utils/           # Helper functions
├── /services/        # API service functions
└── /assets/          # Static assets
```

### **Error Handling Strategy**

- **Consistent Response Format:**
  ```javascript
  {
    "success": boolean,
    "message": "string",
    "data": object | null,
    "errors": array | null
  }
  ```
- **HTTP Status Codes:** Use appropriate status codes (200, 201, 400, 401, 404, 500)
- **Validation Errors:** Return detailed validation error messages
- **Global Error Handler:** Catch and format all unhandled errors
- **Logging:** Log errors for debugging while sending clean responses to clients

### **API Response Standards**

- **Success Responses:** Always include `success: true` and relevant data
- **Error Responses:** Always include `success: false` and descriptive message
- **Pagination:** Use `limit`, `offset`, `total`, `hasMore` for list endpoints
- **Consistent Field Names:** Use camelCase for all JSON responses

### **Database Patterns**

- **Schema Validation:** Use Mongoose validation for data integrity
- **Indexes:** Create indexes for frequently queried fields
- **Relationships:** Use references for related data (ObjectIds)
- **Soft Deletes:** Use `isActive` flag instead of hard deletes
- **Timestamps:** Include `createdAt` and `updatedAt` on all models

### **Security Patterns**

- **Input Validation:** Validate all user inputs
- **Password Hashing:** Use bcrypt with salt rounds of 12
- **JWT Tokens:** Use secure tokens with expiration
- **CORS:** Configure proper CORS settings
- **Rate Limiting:** Implement rate limiting for API endpoints
- **Environment Variables:** Store sensitive data in environment variables
- **File Upload Security:** Validate file types and sizes, automatic cleanup

### **Performance Patterns**

- **Database Queries:** Use efficient queries with proper indexing
- **Caching:** Cache frequently accessed data
- **Pagination:** Implement pagination for large datasets
- **Lazy Loading:** Load data only when needed
- **Image Optimization:** Optimize images for web delivery

### **Refactoring Guidelines**

- **Extract Function:** Break large functions into smaller, focused ones
- **Extract Variable:** Give meaningful names to complex expressions
- **Replace Magic Numbers:** Use constants instead of hardcoded values
- **Remove Duplication:** Identify and eliminate repeated code
- **Improve Naming:** Use descriptive names for variables and functions

### **Git Workflow Rules**

- **Branches:** `main` (production), `develop` (integration), feature branches (`feature/xyz`)
- **Pull requests:** Required for merging to `main`/`develop`
- **Commit Messages:** Use conventional commit format
- **Handling Changes:**
  - Features: feature branches
  - Fixes: `fix/` branches
  - Docs: `docs/` branches

## Decision Log

See [Decision Log](docs/DECISION_LOG.md) for a complete history of all major architectural decisions.

## **PROMPT TEMPLATE: BACKLOG PLANNING**

I want to organize my project features and priorities. Check our documentation first.

**SITUATION:** [new project planning, reprioritizing, adding features, sprint planning]

Please help me:

1. Review current backlog against project goals
2. Write proper user stories for vague features
3. Break down large features into smaller tasks
4. Prioritize based on [learning goals/user value/technical dependencies]
5. Suggest what to work on next and why
6. Update documentation with revised backlog

Focus on: keeping momentum, learning progression, and delivering value quickly.

## Implementation Plan

See [Feature Backlog & Progress](docs/BACKLOG.md) for a detailed implementation plan and progress tracker.

### Development Roadmap & Git Workflow

- Each phase/feature gets its own branch: `feature/[feature-name]`
- Use `develop` for integration, `main` for production-ready code
- Pull requests for merging features
- Small, focused commits with clear messages

## API Documentation

See [API Documentation](docs/API.md) for all endpoint specifications.

## Database Schema

See [Database Schema](docs/SCHEMA.md) for all model specifications.

## Dependencies

- **Frontend:** React, React Router, Axios, etc. (to be added as implemented)
- **Backend:** Express, Mongoose, Socket.IO, JWT, bcrypt, express-validator, multer, dotenv, nodemon (dev)
- **Why chosen:** See Architecture Decisions
- **Setup notes:** Dependencies are listed and versioned as they are added during development.

## Current Project Status

### ✅ Completed Features

- **User Authentication System:**

  - User registration and login
  - JWT token-based authentication
  - Input validation and error handling
  - Service layer architecture

- **Profile Management System:**
  - Profile information updates (firstName, lastName, bio)
  - Profile picture upload/removal (5MB limit)
  - Cover picture upload/removal (10MB limit)
  - File storage with automatic cleanup
  - Static file serving for uploaded images

### 🔄 In Progress

- **Post Creation System:** Next priority feature

### 📋 Planned Features

- Comment and reply system
- Like/react functionality
- Follow/unfollow system
- Search functionality
- User profile pages

## Quick Reference

- **How to run the project:** See README.md
- **Common commands:**
  - Backend: `cd backend && npm run dev`
  - Frontend: `cd frontend && npm run dev`
- **Key files:** `/frontend/src/main.jsx`, `/backend/app.js`, `/backend/config/db.js`
- **Environment Setup:** Create a `.env` file in the `/backend` directory with `PORT`, `MONGO_URI`, and `JWT_SECRET` variables.
- **API Testing:** Use Postman with the documented endpoints
- **Quick Navigation:**
  - Backend files and dependencies: [Backend Reference](docs/BACKEND_REFERENCE.md)
  - Frontend components and dependencies: [Frontend Reference](docs/FRONTEND_REFERENCE.md)
  - API endpoints: [API Documentation](docs/API.md)
  - Database models: [Database Schema](docs/SCHEMA.md)
- **Quick File Tags for New Chats:**
  ```
  @PROJECT_DOCUMENTATION.md
  @README.md
  @backend/package.json
  @frontend/package.json
  @backend/app.js
  @docs/BACKEND_REFERENCE.md
  @docs/BACKLOG.md
  ```

## Learning Notes

See [Learning Notes](docs/LEARNINGS.md) for a personal log of concepts, resources, and lessons learned.
