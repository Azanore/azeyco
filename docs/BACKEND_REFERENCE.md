# Backend Reference

This document provides quick navigation and reference for the backend codebase.

## File Structure

```
/backend
├── app.js                          # Main application entry point
├── package.json                    # Dependencies and scripts
├── .env                           # Environment variables (not in git)
├── /config
│   └── db.js                      # Database connection configuration
├── /controllers
│   ├── userController.js          # User authentication logic
│   └── profileController.js       # Profile management logic
├── /middleware
│   ├── auth.js                    # JWT authentication middleware
│   └── upload.js                  # File upload middleware (multer)
├── /models
│   └── User.js                    # User data model and schema
├── /routes
│   ├── userRoutes.js              # User authentication routes
│   └── profileRoutes.js           # Profile management routes
├── /services
│   ├── jwtService.js              # JWT token operations
│   └── userService.js             # User business logic
├── /utils
│   └── responseUtils.js           # Standardized response helpers
├── /validators
│   ├── userValidators.js          # User input validation
│   └── profileValidators.js       # Profile input validation
└── /uploads                       # File storage (not in git)
    ├── /profile-pictures          # Profile picture uploads
    └── /cover-pictures            # Cover picture uploads
```

## Dependencies

### Core Dependencies

- **express**: ^5.1.0 - Web framework
- **mongoose**: ^8.16.0 - MongoDB ODM
- **bcrypt**: ^6.0.0 - Password hashing
- **jsonwebtoken**: ^9.0.2 - JWT authentication
- **express-validator**: ^7.2.1 - Input validation
- **multer**: ^1.4.5 - File upload handling
- **dotenv**: ^16.5.0 - Environment variables

### Development Dependencies

- **nodemon**: ^3.1.10 - Development server with auto-restart

## Key Files and Their Purposes

### Entry Point

- **app.js**: Main server file, middleware setup, route registration

### Models

- **User.js**: User schema with validation, password hashing, and methods

### Controllers

- **userController.js**: Registration, login, profile retrieval
- **profileController.js**: Profile updates, picture uploads/removal

### Middleware

- **auth.js**: JWT token verification and user authentication
- **upload.js**: File upload configuration for profile/cover pictures

### Routes

- **userRoutes.js**: Authentication endpoints (/register, /login, /profile)
- **profileRoutes.js**: Profile management endpoints (/profile/\*)

### Services

- **jwtService.js**: JWT token generation and verification
- **userService.js**: User business logic and database operations

### Validators

- **userValidators.js**: Registration and login validation rules
- **profileValidators.js**: Profile update validation rules

### Utils

- **responseUtils.js**: Standardized API response helpers

## API Endpoints

### Authentication

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get current user profile

### Profile Management

- `PUT /api/users/profile` - Update profile information
- `POST /api/users/profile/picture` - Upload profile picture
- `POST /api/users/profile/cover` - Upload cover picture
- `DELETE /api/users/profile/picture` - Remove profile picture
- `DELETE /api/users/profile/cover` - Remove cover picture

## Environment Variables

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/azeyco
JWT_SECRET=your_jwt_secret_here
```

## Running the Backend

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## File Upload Configuration

- **Profile Pictures**: Max 5MB, stored in `/uploads/profile-pictures/`
- **Cover Pictures**: Max 10MB, stored in `/uploads/cover-pictures/`
- **File Types**: Images only (JPEG, PNG, GIF, etc.)
- **Access**: Files served statically at `/uploads/`

## Security Features

- JWT-based authentication
- Password hashing with bcrypt (12 salt rounds)
- Input validation with express-validator
- File type and size validation
- Automatic cleanup of old uploaded files
