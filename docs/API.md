# API Documentation

This document contains detailed specifications for all API endpoints.

## Base URL

`http://localhost:5000/api`

## Authentication

Most endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## User Authentication Endpoints

### Register User

**POST** `/users/register`

Register a new user account.

**Request Body:**

```json
{
  "username": "string (3-30 chars, alphanumeric + underscore)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)",
  "firstName": "string (required, max 50 chars)",
  "lastName": "string (required, max 50 chars)"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": "string",
      "coverPicture": "string",
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    },
    "token": "jwt-token-string"
  }
}
```

**Error Responses:**

- `400` - Validation errors or user already exists
- `500` - Server error

### Login User

**POST** `/users/login`

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "email": "string (valid email)",
  "password": "string"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": "string",
      "coverPicture": "string",
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    },
    "token": "jwt-token-string"
  }
}
```

**Error Responses:**

- `400` - Validation errors
- `401` - Invalid credentials or account deactivated
- `500` - Server error

### Get User Profile

**GET** `/users/profile`

Get current user's profile information.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": "string",
      "coverPicture": "string",
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Error Responses:**

- `401` - No token provided or invalid token
- `404` - User not found
- `500` - Server error

## Profile Management Endpoints

### Update Profile Information

**PUT** `/users/profile`

Update user's profile information (firstName, lastName, bio).

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "firstName": "string (optional, max 50 chars, letters and spaces only)",
  "lastName": "string (optional, max 50 chars, letters and spaces only)",
  "bio": "string (optional, max 500 chars)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": "string",
      "coverPicture": "string",
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Error Responses:**

- `400` - Validation errors
- `401` - No token provided or invalid token
- `404` - User not found
- `500` - Server error

### Upload Profile Picture

**POST** `/users/profile/picture`

Upload a new profile picture.

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body:**

```
Form Data:
- image: file (image file, max 5MB)
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": "uploads/profile-pictures/profile-1234567890.jpg",
      "coverPicture": "string",
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Error Responses:**

- `400` - No file uploaded or invalid file type
- `401` - No token provided or invalid token
- `404` - User not found
- `413` - File too large
- `500` - Server error

### Upload Cover Picture

**POST** `/users/profile/cover`

Upload a new cover picture.

**Headers:**

```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body:**

```
Form Data:
- image: file (image file, max 10MB)
```

**Response (200):**

```json
{
  "success": true,
  "message": "Cover picture uploaded successfully",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": "string",
      "coverPicture": "uploads/cover-pictures/cover-1234567890.jpg",
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Error Responses:**

- `400` - No file uploaded or invalid file type
- `401` - No token provided or invalid token
- `404` - User not found
- `413` - File too large
- `500` - Server error

### Remove Profile Picture

**DELETE** `/users/profile/picture`

Remove the current profile picture.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile picture removed successfully",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": null,
      "coverPicture": "string",
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Error Responses:**

- `401` - No token provided or invalid token
- `404` - User not found
- `500` - Server error

### Remove Cover Picture

**DELETE** `/users/profile/cover`

Remove the current cover picture.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Cover picture removed successfully",
  "data": {
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "bio": "string",
      "profilePicture": "string",
      "coverPicture": null,
      "isVerified": false,
      "isActive": true,
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
}
```

**Error Responses:**

- `401` - No token provided or invalid token
- `404` - User not found
- `500` - Server error

## File Access

Uploaded images can be accessed via:

- Profile pictures: `http://localhost:5000/uploads/profile-pictures/filename.jpg`
- Cover pictures: `http://localhost:5000/uploads/cover-pictures/filename.jpg`

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Only for validation errors
}
```
