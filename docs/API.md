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

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Only for validation errors
}
```
