# Azeyco

Azeyco is a modern social networking platform enabling users to connect, share, and engage through posts, comments, and real-time interactions.

This project is a monorepo containing the frontend and backend applications, built following the guidance in `PROJECT_DOCUMENTATION.md`.

## Tech Stack

- **Frontend:** React (Vite), JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time:** Socket.IO

## Project Structure

- `/frontend` - Contains the React client application
- `/backend` - Contains the Node.js/Express server application
- `/docs` - Contains detailed documentation, API specs, and reference files
- `PROJECT_DOCUMENTATION.md` - The single source of truth for all project architecture, decisions, and plans

## Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm
- Git

### Installation & Setup

1. **Clone the repository.**

   ```bash
   git clone https://github.com/Azanore/azeyco.git
   cd azeyco
   ```

2. **Set up Backend:**

   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/azeyco
     JWT_SECRET=your_jwt_secret_here
     ```

3. **Set up Frontend:**
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

## Running the Application

1. **Start the backend server:**

   - From the `/backend` directory, run:
     ```bash
     npm run dev
     ```
   - The server will start on `http://localhost:5000`

2. **Start the frontend development server:**
   - From the `/frontend` directory, run:
     ```bash
     npm run dev
     ```
   - The React app will open in your browser

## API Testing

Use Postman with the documented endpoints in `docs/API.md` for testing the API.

**New Post Endpoints:**

- `POST /api/posts` - Create new post (text + images)
- `GET /api/posts` - Get posts with pagination and filtering
- `GET /api/posts/:id` - Get single post by ID
- `PUT /api/posts/:id` - Update post (author only)
- `DELETE /api/posts/:id` - Delete post (author only)

## Current Features

### ✅ Completed

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

- **Post Creation System:**
  - Create text/media posts (max 280 chars, up to 10 images, 2MB each)
  - Hashtag extraction from content
  - Privacy controls (public, followers, private)
  - Edit/delete own posts
  - Pagination and filtering
  - Complete API documentation and validation

### 🔄 In Progress

- **Post Creation System:** Next priority feature

### 📋 Planned Features

- Comment and reply system
- Like/react functionality
- Follow/unfollow system
- Search functionality
- User profile pages

## Architecture Highlights

- **Service Layer Pattern:** Business logic separated from controllers
- **DRY Principle:** Reusable utility functions and shared components
- **SOLID Principles:** Single responsibility, dependency inversion
- **Consistent Error Handling:** Standardized API response format
- **JSDoc Documentation:** Comprehensive function documentation
- **Modular Architecture:** Clear separation of concerns

## Documentation

- **Main Documentation:** `PROJECT_DOCUMENTATION.md` - Architectural blueprint and index
- **API Documentation:** `docs/API.md` - Detailed endpoint specifications
- **Database Schema:** `docs/SCHEMA.md` - Model specifications
- **Feature Backlog:** `docs/BACKLOG.md` - Progress tracking
- **Decision Log:** `docs/DECISION_LOG.md` - Architectural decisions
- **Learning Notes:** `docs/LEARNINGS.md` - Concepts and lessons learned
- **Backend Reference:** `docs/BACKEND_REFERENCE.md` - Quick file navigation
- **Frontend Reference:** `docs/FRONTEND_REFERENCE.md` - Component registry

## Development Standards

This project follows comprehensive coding standards including:

- SOLID principles
- DRY (Don't Repeat Yourself)
- Service layer pattern
- Consistent error handling
- JSDoc documentation
- Modular architecture

See `PROJECT_DOCUMENTATION.md` for detailed development standards and patterns.

**Note:** Ensure the `backend/uploads/posts` directory exists for post media uploads. The server will store uploaded images here.
