# Frontend Reference Guide

This document serves as a quick-reference index for the frontend codebase. It provides a high-level overview of the file structure, key dependencies, and a registry of reusable components.

## File Structure Overview

This section briefly describes the purpose of key directories and files.

- `/public`
  - Contains static assets that are publicly accessible.
- `/src`
  - `main.jsx`: The main entry point for the React application. Renders the root `App` component.
  - `App.jsx`: The root component of the application. This is where routing will likely be set up.
  - `index.css`: Global CSS styles for the application.
  - `App.css`: Component-specific styles for the App component.
  - `/assets`
    - Contains static assets like images and SVGs that are imported into components.
    - `react.svg`: React logo asset.
  - `/components`
    - `[To be added]` - Will contain globally reusable "dumb" components (e.g., `Button.jsx`, `Input.jsx`, `Modal.jsx`).
  - `/pages` or `/views`
    - `[To be added]` - Will contain top-level components that represent a page in the application (e.g., `HomePage.jsx`, `ProfilePage.jsx`).
  - `/features`
    - `[To be added]` - Will contain components and logic related to a specific application feature (e.g., `/features/posts/`).

## Frontend Dependencies

### Production Dependencies

- `react`: ^19.1.0 - The React library for building user interfaces
- `react-dom`: ^19.1.0 - React rendering for web applications

### Development Dependencies

- `@eslint/js`: ^9.25.0 - ESLint JavaScript configuration
- `@types/react`: ^19.1.2 - TypeScript definitions for React
- `@types/react-dom`: ^19.1.2 - TypeScript definitions for React DOM
- `@vitejs/plugin-react`: ^4.4.1 - Vite plugin for React support
- `eslint`: ^9.25.0 - JavaScript linting utility
- `eslint-plugin-react-hooks`: ^5.2.0 - ESLint rules for React Hooks
- `eslint-plugin-react-refresh`: ^0.4.19 - ESLint plugin for React Refresh
- `globals`: ^16.0.0 - Global variables for ESLint
- `vite`: ^6.3.5 - Build tool and development server

## Build Configuration

- `vite.config.js`: Vite configuration file for build and development settings
- `eslint.config.js`: ESLint configuration for code linting
- `index.html`: HTML entry point for the application

## Component Registry

- `[To be populated as reusable components are built]`

| Component | Purpose | Props |
| :-------- | :------ | :---- |
|           |         |       |

## Related Documentation

- The primary API contract for the frontend is the [API Documentation](API.md).
