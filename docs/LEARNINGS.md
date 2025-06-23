# Learning Notes

This document tracks concepts, resources, and lessons learned during the project development.

## 2024-06-23: Profile Management Implementation

### File Upload with Multer

**Concept:** Handling multipart/form-data for file uploads
**Implementation:** Used multer middleware with disk storage
**Key Learnings:**

- Multer requires different configuration for different upload types
- File filtering is crucial for security (image types only)
- Size limits should be reasonable for web use
- Automatic cleanup prevents storage bloat

**Resources:**

- [Multer Documentation](https://github.com/expressjs/multer)
- [Express File Upload Best Practices](https://expressjs.com/en/resources/middleware/multer.html)

### Static File Serving

**Concept:** Serving uploaded files via HTTP
**Implementation:** `express.static()` middleware for uploads directory
**Key Learnings:**

- Files are accessible via direct URLs
- Path normalization needed for cross-platform compatibility
- Security considerations for file access

### File System Operations

**Concept:** Managing files programmatically
**Implementation:** Node.js fs module for file deletion
**Key Learnings:**

- Always check if file exists before deletion
- Use synchronous operations for simple cases
- Handle errors gracefully

## 2024-06-23: Git Security Best Practices

### Removing Files from Git History

**Concept:** Removing sensitive files that were accidentally committed
**Implementation:** `git rm --cached` to stop tracking without deleting locally
**Key Learnings:**

- `git rm --cached` removes from tracking but keeps local file
- Update .gitignore before removing to prevent re-commit
- Consider using `git filter-branch` for complete history removal if needed

**Resources:**

- [Git Documentation - Removing Files](https://git-scm.com/docs/git-rm)
- [GitHub - Removing Sensitive Data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

### .gitignore Patterns

**Concept:** Preventing sensitive files from being committed
**Implementation:** Added patterns for API collections and upload directories
**Key Learnings:**

- Use wildcards for similar file types (`*_api_collection.json`)
- Exclude user-generated content (`/backend/uploads/`)
- Regular review of .gitignore as project grows

## 2024-06-23: Middleware Import/Export Patterns

### Named Exports vs Default Exports

**Concept:** JavaScript module export patterns
**Implementation:** Used named exports `{ protect }` for middleware
**Key Learnings:**

- Named exports prevent import/export mismatches
- Clear function naming improves code readability
- Consistent patterns across the project

**Error Encountered:** `TypeError: argument handler must be a function`
**Root Cause:** Importing object instead of function due to export mismatch
**Solution:** Standardized on named exports for middleware functions

## 2024-06-23: Express Validation with Arrays

### Spreading Validation Arrays

**Concept:** Using validation middleware arrays in Express routes
**Implementation:** `...updateProfileValidation` to spread array elements
**Key Learnings:**

- Express expects individual middleware functions
- Arrays need to be spread when used as middleware
- Validation arrays improve code organization

## 2024-06-23: Initial Project Setup

### MongoDB with Mongoose

**Concept:** NoSQL database with ODM
**Implementation:** User schema with validation and middleware
**Key Learnings:**

- Mongoose provides schema validation
- Pre-save hooks for password hashing
- Virtual fields and methods for data manipulation

### JWT Authentication

**Concept:** Stateless authentication tokens
**Implementation:** JWT service for token generation and verification
**Key Learnings:**

- Tokens should have expiration times
- Secret keys must be secure and environment-specific
- Token verification in middleware for route protection

### Express Architecture Patterns

**Concept:** MVC + Service Layer pattern
**Implementation:** Controllers, Services, Models separation
**Key Learnings:**

- Controllers should be thin (HTTP handling only)
- Business logic belongs in services
- Models handle data structure and validation
- Utilities provide reusable functions

## Useful Resources

### Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Node.js File System](https://nodejs.org/api/fs.html)

### Best Practices

- [Express Best Practices](https://expressjs.com/en/advanced/best-practices-performance.html)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/data-modeling/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

### Security

- [OWASP Node.js Security](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practices-security.html)
