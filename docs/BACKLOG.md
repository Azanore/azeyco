# Feature Backlog & Progress

This document tracks all planned features, user stories, and progress.

### High Priority (MVP)

- [x] As a user, I want to register, log in, and verify my email so that I can securely access the platform ✅ COMPLETED (Basic auth without email verification)
- [x] As a user, I want to manage my profile (bio, photo, cover) so that I can personalize my presence ✅ COMPLETED
- [ ] As a user, I want to create text/media posts with character limits so that I can share content
- [ ] As a user, I want to comment and reply (with media) so that I can engage with posts
- [ ] As a user, I want to like/react to posts and comments so that I can express feedback
- [ ] As a user, I want to follow/unfollow others and see a chronological feed so that I can curate my experience
- [ ] As a user, I want to search by username, name, or hashtag so that I can discover people and topics
- [ ] As a user, I want to view profile pages with posts and follower counts so that I can learn about others
- [ ] As a user, I want to edit/delete my own posts and moderate comments so that I can control my content
- [ ] As a user, I want to see timestamps and profile pictures in posts/comments so that I have context

### Medium Priority (Post-MVP)

- [ ] Friend system (requests, accept/decline/cancel)
- [ ] Privacy controls (post visibility)
- [ ] User blocking/unblocking
- [ ] Tag users in posts (@username)
- [ ] Repost/share content
- [ ] Stories (24-hour disappearing posts)
- [ ] Direct messaging (1-on-1)
- [ ] Save/bookmark posts
- [ ] Account management (edit info, deactivate)
- [ ] User verification badges
- [ ] Report system for inappropriate content
- [ ] Email verification system (nodemailer integration)

### Low Priority (Future/Nice-to-Have)

- [ ] Communities/groups with permissions
- [ ] Multiple media per post
- [ ] Group chat rooms
- [ ] Dark mode, activity status, online presence
- [ ] Advanced notification system

### Current Sprint/Focus

**What I'm building now:** Profile Management System ✅ COMPLETED
**What was implemented:**

- User model, registration, login, JWT authentication, input validation ✅
- Profile information updates (firstName, lastName, bio) ✅
- Profile picture upload/removal (5MB limit, image validation) ✅
- Cover picture upload/removal (10MB limit, image validation) ✅
- File storage with automatic cleanup of old files ✅
- Static file serving for uploaded images ✅
  **Dependencies added:** bcrypt, jsonwebtoken, express-validator, multer
  **Next priority:** Post creation system (text/media posts with character limits)
  **Blockers/Questions:** None - ready for next feature

### Profile Management Implementation Details

**Endpoints Created:**

- `PUT /api/users/profile` - Update profile information
- `POST /api/users/profile/picture` - Upload profile picture
- `POST /api/users/profile/cover` - Upload cover picture
- `DELETE /api/users/profile/picture` - Remove profile picture
- `DELETE /api/users/profile/cover` - Remove cover picture

**Features:**

- ✅ Input validation for profile fields
- ✅ File type validation (images only)
- ✅ File size limits (5MB profile, 10MB cover)
- ✅ Automatic old file cleanup
- ✅ Cross-platform path handling
- ✅ Static file serving
- ✅ Complete API documentation
- ✅ Postman collection updated
