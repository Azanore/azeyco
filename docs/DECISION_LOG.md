# Decision Log

This document tracks all major architectural decisions made during the project development.

## 2024-06-23: Profile Management System Implementation

### Decision: Hybrid API Approach for Profile Management

**Context:** Needed to implement profile updates and file uploads
**Decision:** Separate endpoints for text updates vs file uploads
**Reasoning:**

- Clear separation of concerns
- Easy to implement and test individually
- Follows REST principles
- Flexible (can update text without touching images)
  **Alternatives Considered:**
- Single endpoint with multipart (complex request handling)
- Base64 storage (larger database, slower queries)

### Decision: Local File Storage for MVP

**Context:** Needed to store profile and cover pictures
**Decision:** Use local file system with multer middleware
**Reasoning:**

- Free and simple implementation
- No external dependencies
- Full control over files
- Easy to migrate to cloud storage later
  **Alternatives Considered:**
- Cloud storage (potential costs, external dependency)
- Base64 storage (larger database size)

### Decision: File Upload Configuration

**Context:** Setting up file upload limits and validation
**Decision:** 5MB for profile pictures, 10MB for cover pictures, images only
**Reasoning:**

- Reasonable file sizes for web use
- Cover pictures can be larger due to aspect ratio needs
- Image-only restriction for security
  **Implementation:** Multer middleware with file filtering and size limits

### Decision: Automatic File Cleanup

**Context:** Managing storage when users update pictures
**Decision:** Automatically delete old files when new ones are uploaded
**Reasoning:**

- Prevents storage bloat
- Clean user experience
- No orphaned files
  **Implementation:** Check for existing files and delete before saving new ones

## 2024-06-23: Git Repository Security

### Decision: Remove Sensitive Files from Repository

**Context:** Prompts.txt and API collection files were accidentally committed
**Decision:** Remove from repository and add to .gitignore
**Reasoning:**

- Prompts.txt contains sensitive project information
- API collections may contain test data
- These files should not be in version control
  **Implementation:**
- Used `git rm --cached` to remove from tracking
- Updated .gitignore to prevent future commits
- Added patterns for similar files

### Decision: Update .gitignore Patterns

**Context:** Need to prevent sensitive files from being committed
**Decision:** Add patterns for API collections and upload directories
**Reasoning:**

- Prevent accidental commits of sensitive files
- Exclude user-generated content from version control
- Follow security best practices
  **Implementation:** Added patterns for `*_api_collection.json`, `*.postman_collection.json`, and `/backend/uploads/`

## 2024-06-23: Middleware Import/Export Standardization

### Decision: Named Exports for Middleware

**Context:** Inconsistent middleware import/export patterns causing errors
**Decision:** Use named exports `{ protect }` for middleware functions
**Reasoning:**

- Consistent with project standards
- Clear function naming
- Prevents import/export mismatches
  **Implementation:** Updated auth middleware export and all route imports

## 2024-06-23: Initial Project Setup

### Decision: Tech Stack Selection

**Context:** Building a modern social networking platform
**Decision:** React + Node.js + Express + MongoDB + JWT
**Reasoning:**

- JavaScript full-stack for consistency
- React for modern UI development
- MongoDB for flexible social data
- JWT for stateless authentication
  **Alternatives Considered:**
- PostgreSQL (strong relational DB, but MongoDB chosen for flexibility)
- Auth0/Firebase Auth (easy, but less control)

### Decision: Monorepo Structure

**Context:** Organizing frontend and backend code
**Decision:** Separate folders for frontend and backend in single repository
**Reasoning:**

- Easier to manage dependencies
- Clear separation of concerns
- Simplified deployment
- Single version control for entire project

### Decision: MVC + Service Layer Architecture

**Context:** Organizing backend code structure
**Decision:** Controllers (thin) + Services (business logic) + Models (data)
**Reasoning:**

- Clear separation of concerns
- Testable business logic
- Scalable architecture
- Follows established patterns

| Date       | Decision                                              | Reasoning                                            | Alternatives Considered                  |
| ---------- | ----------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------- |
| 2024-06-07 | Chose React, Node/Express, MongoDB, JWT, Socket.IO    | Best fit for requirements, learning, and scalability | PostgreSQL, Auth0, Pusher                |
| 2024-06-07 | Separated documentation into `/docs` folder           | Better organization and scalability for large docs   | Single large file                        |
| 2024-06-07 | Created reference files for quick navigation          | Easy access to file purposes and dependencies        | No reference docs                        |
| 2024-06-07 | Implemented modular backend structure                 | Better code organization and maintainability         | Monolithic structure                     |
| 2024-06-07 | Added database connection with Mongoose               | Foundation for all data operations                   | Direct MongoDB driver                    |
| 2024-06-07 | Created layered documentation strategy                | Main doc as index, detailed docs separate            | Single comprehensive doc                 |
| 2024-06-07 | Added quick file tags for new chat context            | Easy context switching between sessions              | Manual file selection                    |
| 2024-06-07 | Updated prompts to match documentation structure      | Ensure coherence between prompts and actual docs     | Keep prompts generic                     |
| 2024-06-07 | Chose basic authentication without email verification | Faster implementation, still secure for development  | Complete auth with email, minimal auth   |
| 2024-06-07 | Selected bcrypt + jsonwebtoken + express-validator    | Industry standard, secure, comprehensive validation  | argon2, manual validation                |
| 2024-06-07 | Made firstName and lastName required fields           | Better user experience, complete profile information | Keep optional, minimal required fields   |
| 2024-06-07 | Created dedicated Postman collection for API testing  | Proper API documentation and testing workflow        | Use generic collection, no collection    |
| 2024-06-07 | Implemented Service Layer pattern for business logic  | Separation of concerns, better testability           | Keep business logic in controllers       |
| 2024-06-07 | Created utility functions for consistent responses    | DRY principle, eliminate code duplication            | Repeat response logic in each controller |
| 2024-06-07 | Separated validation schemas into dedicated files     | Reusability, maintainability, single responsibility  | Keep validation in route files           |
| 2024-06-07 | Applied SOLID principles to code architecture         | Better maintainability, scalability, and testability | Keep monolithic structure                |
