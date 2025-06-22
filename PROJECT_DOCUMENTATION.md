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
  - `/docs` (guides, architecture, API docs)
  - `/scripts` (setup, utilities)
  - Root: `README.md`, `PROJECT_DOCUMENTATION.md`, `.gitignore`, etc.
- **File naming conventions:**
  - camelCase for JS/TS files, PascalCase for React components
  - kebab-case for config/scripts
- **Code organization patterns:**
  - Feature-based folders in frontend (e.g., `features/posts/`)
  - Modular routers/controllers/services in backend

## Development Standards

- **Coding conventions:**
  - Prettier + ESLint for formatting/linting
  - Consistent naming, clear comments, modular code
- **Git workflow rules:**
  - Branches: `main` (production), `develop` (integration), feature branches (`feature/xyz`)
  - Pull requests for merging to `main`/`develop`
- **Handling changes:**
  - Features: feature branches
  - Fixes: `fix/` branches
  - Docs: `docs/` branches

## Decision Log

| Date       | Decision                                           | Reasoning                                            | Alternatives Considered   |
| ---------- | -------------------------------------------------- | ---------------------------------------------------- | ------------------------- |
| 2024-06-07 | Chose React, Node/Express, MongoDB, JWT, Socket.IO | Best fit for requirements, learning, and scalability | PostgreSQL, Auth0, Pusher |

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

### Project Phases & Milestones

1. **Phase 1: Foundation & User System (MVP)**
   - Project scaffolding (frontend/backend)
   - User registration, login, email verification, password reset
   - User profile management (bio, profile photo, cover image)
   - Basic post creation (text, media, character limits)
   - Chronological feed (follow/unfollow, view posts)
   - Like/react system
   - Comments with 1-level replies
   - Basic search (username, name, hashtags)
   - Profile pages (user's posts, follower count, info)
   - Edit/delete own posts, comment moderation
   - Timestamps on posts/comments
   - Profile pictures in posts/comments
2. **Phase 2: Social Layer & Safety**
   - Friend system (requests, accept/decline/cancel)
   - Privacy controls (post visibility)
   - User blocking/unblocking
   - Tag users in posts (@username)
   - Repost/share content
   - Stories (24-hour disappearing posts)
   - Direct messaging (1-on-1)
   - Save/bookmark posts
   - Account management (edit info, deactivate)
   - User verification badges
   - Report system for inappropriate content
3. **Phase 3: Community & Polish**
   - Communities/groups with permissions
   - Multiple media per post
   - Group chat rooms
   - Dark mode, activity status, online presence
   - Advanced notification system

### MVP Feature List (High Priority)

- User registration/login with email verification and password reset
- Profile management
- Text/media posts with character limits
- Comments/replies with media
- Like/react system
- Follow/unfollow and feed
- Search (user, hashtag)
- Profile pages
- Edit/delete own content
- Timestamps
- Profile pictures in posts/comments

### Development Roadmap & Git Workflow

- Each phase/feature gets its own branch: `feature/[feature-name]`
- Use `develop` for integration, `main` for production-ready code
- Pull requests for merging features
- Small, focused commits with clear messages

## Feature Backlog & Progress

### High Priority (MVP)

- [ ] As a user, I want to register, log in, and verify my email so that I can securely access the platform
- [ ] As a user, I want to manage my profile (bio, photo, cover) so that I can personalize my presence
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

### Low Priority (Future/Nice-to-Have)

- [ ] Communities/groups with permissions
- [ ] Multiple media per post
- [ ] Group chat rooms
- [ ] Dark mode, activity status, online presence
- [ ] Advanced notification system

### Current Sprint/Focus

**What I'm building now:** [Current feature]
**Why this next:** [Reasoning for priority]
**Blockers/Questions:** [Any issues]

## Dependencies

- **Frontend:** React, React Router, Axios, etc. (to be added as implemented)
- **Backend:** Express, Mongoose, Socket.IO, JWT, Nodemailer, etc. (to be added as implemented)
- **Why chosen:** See Architecture Decisions
- **Setup notes:** Dependencies will be listed and versioned as they are added during development.

## Quick Reference

- **How to run the project:** See README.md
- **Common commands:** To be added
- **Key files:** `/frontend/src/index.js`, `/backend/app.js`, etc.

## Learning Notes

- **New concepts learned:** To be updated
- **Useful resources:** To be updated
- **Mistakes/lessons:** To be updated
