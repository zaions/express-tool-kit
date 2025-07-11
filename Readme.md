# Express BuildKit

[![npm version](https://img.shields.io/npm/v/express-buildkit.svg)](https://www.npmjs.com/package/express-buildkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x%20%7C%205.x-green.svg)](https://expressjs.com/)

A comprehensive TypeScript utility library for Express.js applications. Express BuildKit provides standardized API response helpers, middleware management, validation utilities, and more to help you build robust and consistent Express applications.

## Features

- 🚀 **Standardized API Responses** - Consistent response format across your entire API
- 🛡️ **Built-in Middleware** - Pre-configured CORS, rate limiting, and body parsing
- ✅ **Validation Helpers** - Seamless integration with Zod for request validation
- 🔧 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 📦 **Zero Config** - Works out of the box with sensible defaults
- ⚡ **Lightweight** - Minimal dependencies, maximum performance
- 🎯 **Express 4 & 5** - Compatible with both Express.js versions

## Installation

```bash
npm install express-buildkit
```

or with yarn:

```bash
yarn add express-buildkit
```

## Quick Start

```typescript
import express from 'express';
import { 
  applyMiddlewaresOnApp, 
  sendApiSuccessResponse,
  configureExpressBuildKit 
} from 'express-buildkit';

// Configure global settings (optional)
configureExpressBuildKit({
  rateLimiterOptions: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
});

const app = express();

// Apply built-in middlewares
applyMiddlewaresOnApp(app, {
  applyCors: true,
  expressJson: true,
  expressUrlEncoded: true,
  applyRateLimiter: true
});

// Your routes
app.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: 'John Doe' }];
  
  sendApiSuccessResponse(res, {
    message: 'Users fetched successfully',
    dataList: users
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Core Features

### API Response Helpers

Express BuildKit provides a consistent API response format:

```typescript
{
  success: boolean;
  message: string;
  result: {
    data?: any;
    dataList?: any[];
    authToken?: string;
  };
  errors: any[];
  code: number;
  status: number;
}
```

#### Available Response Functions

```typescript
// Success response
sendApiSuccessResponse(res, {
  message: 'Operation successful',
  data: { id: 1, name: 'John' }
});

// Failed response
sendApiFailedResponse(res, {
  message: 'Operation failed',
  errors: ['Invalid input']
});

// Specific error responses
sendBadRequestResponse(res, { message: 'Invalid request data' });
sendUnAuthenticatedErrorResponse(res, { message: 'Please login first' });
sendUnAuthorizedErrorResponse(res, { message: 'Access denied' });
sendNotFoundErrorResponse(res, { message: 'Resource not found' });
sendTooManyRequestsErrorResponse(res, { message: 'Rate limit exceeded' });
sendItemExistsErrorResponse(res, { message: 'Item already exists' });
```

### Middleware Management

Apply common middlewares with a single function call:

```typescript
applyMiddlewaresOnApp(app, {
  applyCors: true,        // Enable CORS
  expressJson: true,      // Parse JSON bodies
  expressUrlEncoded: true,// Parse URL-encoded bodies
  applyRateLimiter: true  // Apply rate limiting
});

// Add invalid route handler
invalidRequestHandler(app);
```

### Request Validation

Integrate Zod schemas for request validation:

```typescript
import { z } from 'zod';
import { validateRequestInputData } from 'express-buildkit';

const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  age: z.number().min(18)
});

app.post('/api/users', async (req, res) => {
  const validatedData = await validateRequestInputData(req, res, createUserSchema);
  
  // If validation fails, error response is automatically sent
  if (!validatedData) return;
  
  // Use validated data with full type safety
  console.log(validatedData.name); // TypeScript knows this is a string
});
```

### Built-in Validation Schemas

Express BuildKit includes pre-built validation schemas for common use cases:

```typescript
import { 
  loginRequestValidationSchema,
  registerRequestValidationSchema 
} from 'express-buildkit';

// Login endpoint
app.post('/api/login', async (req, res) => {
  const credentials = await validateRequestInputData(
    req, 
    res, 
    loginRequestValidationSchema
  );
  if (!credentials) return;
  
  // credentials.email and credentials.password are validated
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const userData = await validateRequestInputData(
    req, 
    res, 
    registerRequestValidationSchema
  );
  if (!userData) return;
  
  // userData includes name, email, password, and passwordConfirmation
});
```

### Configuration

Configure global settings for Express BuildKit:

```typescript
import { configureExpressBuildKit } from 'express-buildkit';

configureExpressBuildKit({
  rateLimiterOptions: {
    windowMs: 15 * 60 * 1000,  // Time window in milliseconds
    max: 100,                   // Max requests per window
    message: 'Too many requests', // Error message
    standardHeaders: true,      // Return rate limit info in headers
    legacyHeaders: false,       // Disable X-RateLimit headers
  }
});
```

## API Reference

For detailed API documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md).

## TypeScript Support

Express BuildKit is written in TypeScript and provides comprehensive type definitions:

```typescript
import type { 
  IApiResponse,
  IApplyMiddlewareOptions,
  IConfigureExpressBuildKitOptions 
} from 'express-buildkit';
```

## Best Practices

1. **Always validate input data** - Use the validation helpers to ensure data integrity
2. **Use consistent responses** - Stick to the provided response helpers for API consistency
3. **Configure rate limiting** - Protect your API from abuse with appropriate rate limits
4. **Handle errors gracefully** - Use the specific error response functions for clear communication

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Support

- 📧 Email: aoneahsan@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/aoneahsan/express-buildkit/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/aoneahsan/express-buildkit/discussions)

## License

MIT © [Ahsan Mahmood](https://aoneahsan.com)

## Author

**Ahsan Mahmood**
- Website: [aoneahsan.com](https://aoneahsan.com)
- GitHub: [@aoneahsan](https://github.com/aoneahsan)
- Email: aoneahsan@gmail.com

---

Made with ❤️ by Ahsan Mahmood