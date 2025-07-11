# Changelog

All notable changes to Express BuildKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-11

### Added
- Complete rebrand from zaions-express-tool-kit to express-buildkit
- New `configureExpressBuildKit()` function (replaces `configureZETK`)
- Configurable CORS options (no more hardcoded `origin: '*'`)
- Improved rate limiter IP detection with trust proxy support
- Comprehensive API documentation (DOCUMENTATION.md)
- MIT License
- Security policy and vulnerability reporting guidelines
- Contributing guidelines
- Code of conduct
- Support documentation
- Project roadmap

### Changed
- Package name changed from `zaions-express-tool-kit` to `express-buildkit`
- All Zaions branding replaced with Ahsan Mahmood
- Repository moved to https://github.com/aoneahsan/express-buildkit
- CORS now configurable via `corsOptions` in configuration
- Rate limiter now uses improved IP detection logic
- Updated all dependencies to latest versions:
  - vitest: 2.1.9 → 3.2.4
  - tsup: 8.4.0 → 8.5.0
  - @types/node: 22.14.1 → 24.0.13

### Security
- Fixed CORS security issue - no longer uses wildcard origin by default
- Improved rate limiter IP detection to prevent spoofing
- Added trust proxy configuration support

### Deprecated
- `configureZETK()` function - use `configureExpressBuildKit()` instead

## [0.0.34] - Previous Release

### Legacy Version
This was the last version released as zaions-express-tool-kit. For the complete history of changes before the rebrand, please refer to the git history.

### Main Features (as of 0.0.34)
- Standardized API response helpers
- Express middleware management
- Zod validation integration
- Pre-built authentication schemas
- TypeScript support
- Express 4 & 5 compatibility

---

## Migration Guide

### From zaions-express-tool-kit to express-buildkit

1. **Update package.json:**
   ```json
   // Old
   "dependencies": {
     "zaions-express-tool-kit": "^0.0.34"
   }
   
   // New
   "dependencies": {
     "express-buildkit": "^1.0.0"
   }
   ```

2. **Update imports:**
   ```typescript
   // Old
   import { configureZETK } from 'zaions-express-tool-kit';
   
   // New
   import { configureExpressBuildKit } from 'express-buildkit';
   ```

3. **Update configuration:**
   ```typescript
   // Old
   configureZETK({
     rateLimiterOptions: { ... }
   });
   
   // New
   configureExpressBuildKit({
     rateLimiterOptions: { ... },
     corsOptions: {
       origin: 'https://myapp.com', // Configure your allowed origins
       credentials: true
     }
   });
   ```

4. **Review CORS settings:**
   - The package no longer uses `origin: '*'` by default
   - Configure appropriate CORS origins for your application

5. **Test your application:**
   - Ensure all imports are updated
   - Verify CORS is working with your configured origins
   - Check rate limiting is functioning correctly