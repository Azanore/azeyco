# Database Schema

This document contains detailed specifications for all database models.

## User Model

**Collection:** `users`

### Schema Fields

| Field            | Type    | Required | Validation                            | Description                          |
| ---------------- | ------- | -------- | ------------------------------------- | ------------------------------------ |
| `username`       | String  | Yes      | 3-30 chars, alphanumeric + underscore | Unique username for the user         |
| `email`          | String  | Yes      | Valid email format                    | Unique email address                 |
| `password`       | String  | Yes      | Min 6 chars, hashed                   | User's password (hashed with bcrypt) |
| `firstName`      | String  | Yes      | Max 50 chars                          | User's first name                    |
| `lastName`       | String  | Yes      | Max 50 chars                          | User's last name                     |
| `bio`            | String  | No       | Max 500 chars                         | User's biography                     |
| `profilePicture` | String  | No       | -                                     | URL to profile picture               |
| `coverPicture`   | String  | No       | -                                     | URL to cover picture                 |
| `isVerified`     | Boolean | No       | Default: false                        | Email verification status            |
| `isActive`       | Boolean | No       | Default: true                         | Account activation status            |
| `createdAt`      | Date    | Auto     | -                                     | Account creation timestamp           |
| `updatedAt`      | Date    | Auto     | -                                     | Last update timestamp                |

### Indexes

- `username` (unique)
- `email` (unique)

### Methods

- `comparePassword(candidatePassword)` - Compares password with hashed version
- `getPublicProfile()` - Returns user object without sensitive data

### Pre-save Hooks

- Automatically hashes password before saving (if modified)

### Example Document

```json
{
  "_id": "ObjectId",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "$2b$12$hashedpasswordstring",
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Software developer",
  "profilePicture": null,
  "coverPicture": null,
  "isVerified": false,
  "isActive": true,
  "createdAt": "2024-06-07T10:00:00.000Z",
  "updatedAt": "2024-06-07T10:00:00.000Z"
}
```
