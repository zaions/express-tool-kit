# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Zaions Express Tool Kit (zaions-express-tool-kit), a TypeScript-based npm package providing utilities and helpers for Express.js applications. It's part of the Zaions package ecosystem that includes zaions-tool-kit, zaions-react-tool-kit, and zaions-react-ui-kit.

## Development Commands

### Building
- `npm run build` - Builds the package for production (unlinks local packages)
- `npm run build:with-linked-packages` - Builds while maintaining linked packages
- `npm run dev` - Runs tsup in watch mode with linked packages

### Testing
- `npm test` - Runs tests using Vitest

### Package Management
- `npm run update:linked-packages` - Updates and links the zaions-tool-kit dependency
- `npm run unlink-packages` - Unlinks the zaions-tool-kit dependency
- `npm run deploy` - Builds and publishes the package to npm

### Development Server
- `npm run serve` - Runs tsup with linked packages (single build)

## Architecture

### Core Structure
The package exports utilities organized into several categories:

1. **API Response Helpers** (`src/utils/helpers/apiHelpers/`)
   - Standardized response functions for Express endpoints
   - Functions like `sendApiResponse`, `sendApiSuccessResponse`, `sendApiFailedResponse`
   - Specialized error responses (BadRequest, NotFound, Unauthorized, etc.)

2. **Middleware Management** (`src/middlewares/`)
   - `applyMiddlewaresOnApp()` - Configures common Express middlewares (CORS, rate limiting, JSON parsing)
   - `invalidRequestHandler()` - Catches unmatched routes
   - Built-in rate limiter with configurable options

3. **Validation** (`src/validationSchema/` and `src/utils/helpers/validationHelpers/`)
   - Pre-built Zod schemas for authentication (login, register)
   - `validateRequestInputData()` helper for request validation
   - Integration with API response helpers for validation errors

4. **Configuration** (`src/configure/`)
   - `configureZETK()` - Global configuration function
   - Rate limiter options management

### Key Dependencies
- **express**: ^4.21.0 or ^5.1.0 (peer dependency)
- **zod**: ^3.24.3 (validation)
- **express-rate-limit**: ^7.5.0 (rate limiting)
- **cors**: ^2.8.5 (CORS handling)
- **zaions-tool-kit**: ^0.0.115 (shared utilities)

### Build Configuration
- Uses tsup for building with both CJS and ESM outputs
- TypeScript source with declaration files
- Path aliases configured:
  - `@helpers` → `./src/utils/helpers`
  - `@enums` → `./src/enums`
  - `@zTypes` → `./src/types`
  - `@src` → `./src`

### Testing
- Vitest for unit testing
- Test files in `./src/**/*.test.{js,ts}` and `./tests/**/*.test.{js,ts}`
- Currently minimal test coverage

## Important Notes

1. This package is designed to work with the zaions-tool-kit package for shared constants and types (ResponseCodeEnum, ResponseStatusEnum, ztkMessages).

2. The package uses a linked development workflow - when developing locally, it links to a local version of zaions-tool-kit.

3. All response helpers follow a consistent API response structure with success, message, result (data/dataList/authToken), errors, code, and status fields.

4. The rate limiter is configurable globally through `configureZETK()` and can be customized per-application.

5. Validation helpers automatically format Zod errors into the standard API response format.