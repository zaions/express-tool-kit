# Express BuildKit API Documentation

This document provides detailed information about all the functions, types, and interfaces exported by Express BuildKit.

## Table of Contents

1. [Configuration Functions](#configuration-functions)
2. [API Response Functions](#api-response-functions)
3. [Middleware Functions](#middleware-functions)
4. [Validation Functions](#validation-functions)
5. [Helper Functions](#helper-functions)
6. [Validation Schemas](#validation-schemas)
7. [TypeScript Interfaces](#typescript-interfaces)

## Configuration Functions

### `configureExpressBuildKit(options)`

Configures global settings for Express BuildKit.

**Parameters:**
- `options: IConfigureExpressBuildKitOptions` - Configuration options

**Options:**
- `rateLimiterOptions?: IExpressRateLimiterOptions` - Rate limiter configuration
- `corsOptions?: IExpressCorsOptions` - CORS configuration
- `trustProxy?: boolean | string | number | string[] | ((ip: string) => boolean)` - Express trust proxy setting

**Example:**
```typescript
import { configureExpressBuildKit } from 'express-buildkit';

configureExpressBuildKit({
  rateLimiterOptions: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP'
  },
  corsOptions: {
    origin: ['https://example.com', 'https://app.example.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  },
  trustProxy: true
});
```

### `configureZETK(options)` (Deprecated)

Legacy configuration function. Use `configureExpressBuildKit` instead.

**Parameters:**
- `options: IConfigureZETKOptions` - Same as `IConfigureExpressBuildKitOptions`

## API Response Functions

All response functions follow a consistent format and automatically set appropriate HTTP status codes.

### `sendApiResponse(res, options?)`

Base function to send API responses. Other response functions use this internally.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `success?: boolean` - Success status
  - `message?: string` - Response message
  - `data?: any` - Single data object
  - `dataList?: any[]` - Array of data objects
  - `authToken?: string` - Authentication token
  - `errors?: any[]` - Error details
  - `code?: number` - Response code
  - `status?: number` - HTTP status code

### `sendApiSuccessResponse(res, options?)`

Sends a successful API response (200 OK by default).

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Success message
  - `data?: any` - Response data
  - `dataList?: any[]` - Array of data
  - `authToken?: string` - Authentication token
  - `code?: number` - Response code (default: 2000)
  - `status?: number` - HTTP status (default: 200)

**Example:**
```typescript
app.get('/api/user/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  sendApiSuccessResponse(res, {
    message: 'User fetched successfully',
    data: user
  });
});
```

### `sendApiFailedResponse(res, options?)`

Sends a failed API response.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Error message
  - `errors?: any[]` - Error details
  - `code?: number` - Error code
  - `status?: number` - HTTP status code

### `sendBadRequestResponse(res, options?)`

Sends a 400 Bad Request response.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Error message (default: "Bad Request")
  - `errors?: any[]` - Validation errors or details
  - `code?: number` - Error code (default: 4000)
  - `status?: number` - HTTP status (default: 400)

**Example:**
```typescript
if (!isValidEmail(email)) {
  sendBadRequestResponse(res, {
    message: 'Invalid email format',
    errors: ['Email must be a valid email address']
  });
  return;
}
```

### `sendUnAuthenticatedErrorResponse(res, options?)`

Sends a 401 Unauthorized response when authentication is missing.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Error message (default: "Unauthenticated")
  - `errors?: any[]` - Error details
  - `code?: number` - Error code (default: 4001)
  - `status?: number` - HTTP status (default: 401)

### `sendUnAuthorizedErrorResponse(res, options?)`

Sends a 403 Forbidden response when user lacks permissions.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Error message (default: "Unauthorized")
  - `errors?: any[]` - Error details
  - `code?: number` - Error code (default: 4003)
  - `status?: number` - HTTP status (default: 403)

### `sendNotFoundErrorResponse(res, options?)`

Sends a 404 Not Found response.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Error message (default: "Not Found")
  - `errors?: any[]` - Error details
  - `code?: number` - Error code (default: 4004)
  - `status?: number` - HTTP status (default: 404)

### `sendTooManyRequestsErrorResponse(res, options?)`

Sends a 429 Too Many Requests response.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Error message (default: "Too Many Requests")
  - `errors?: any[]` - Error details
  - `code?: number` - Error code (default: 4029)
  - `status?: number` - HTTP status (default: 429)

### `sendItemExistsErrorResponse(res, options?)`

Sends a 409 Conflict response when trying to create a duplicate resource.

**Parameters:**
- `res: Response` - Express response object
- `options?: object` - Response options
  - `message?: string` - Error message (default: "Item Already Exists")
  - `errors?: any[]` - Error details
  - `code?: number` - Error code (default: 4009)
  - `status?: number` - HTTP status (default: 409)

## Middleware Functions

### `applyMiddlewaresOnApp(app, options)`

Applies common Express middlewares to your application.

**Parameters:**
- `app: Express` - Express application instance
- `options: IApplyMiddlewareOptions` - Middleware configuration
  - `applyCors?: boolean` - Enable CORS middleware
  - `corsOptions?: CorsOptions` - Custom CORS options (overrides global config)
  - `expressJson?: boolean` - Enable JSON body parsing
  - `expressUrlEncoded?: boolean` - Enable URL-encoded body parsing
  - `applyRateLimiter?: boolean` - Enable rate limiting (default: true)
  - `expressRateLimiter?: RateLimitRequestHandler` - Custom rate limiter

**Example:**
```typescript
import express from 'express';
import { applyMiddlewaresOnApp } from 'express-buildkit';

const app = express();

applyMiddlewaresOnApp(app, {
  applyCors: true,
  corsOptions: {
    origin: 'https://myapp.com',
    credentials: true
  },
  expressJson: true,
  expressUrlEncoded: true,
  applyRateLimiter: true
});
```

### `invalidRequestHandler(app)`

Adds a catch-all handler for unmatched routes.

**Parameters:**
- `app: Express` - Express application instance

**Example:**
```typescript
// Add this after all your routes
invalidRequestHandler(app);
```

## Validation Functions

### `validateRequestInputData<T>(req, res, validationSchema)`

Validates request body against a Zod schema.

**Parameters:**
- `req: Request` - Express request object
- `res: Response` - Express response object
- `validationSchema: ZodObject<any> | ZodEffects<any>` - Zod validation schema

**Returns:**
- `Promise<T | Response>` - Validated data or error response

**Example:**
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
  
  // If validation fails, error response is sent automatically
  if (!validatedData) return;
  
  // validatedData is fully typed
  const user = await createUser(validatedData);
  sendApiSuccessResponse(res, { data: user });
});
```

## Helper Functions

### `isApiResponse(value)`

Type guard to check if a value is an Express Response object.

**Parameters:**
- `value: any` - Value to check

**Returns:**
- `boolean` - True if value is a Response object

### `getExpressRateLimiterOptions()`

Gets the currently configured rate limiter options.

**Returns:**
- `IExpressRateLimiterOptions | null` - Current rate limiter configuration

### `setExpressRateLimiterOptions(options)`

Sets the global rate limiter options (used internally by `configureExpressBuildKit`).

**Parameters:**
- `options: IExpressRateLimiterOptions` - Rate limiter configuration

### `getExpressCorsOptions()`

Gets the currently configured CORS options.

**Returns:**
- `IExpressCorsOptions | null` - Current CORS configuration

### `setExpressCorsOptions(options)`

Sets the global CORS options (used internally by `configureExpressBuildKit`).

**Parameters:**
- `options: IExpressCorsOptions` - CORS configuration

## Validation Schemas

### `loginRequestValidationSchema`

Pre-built Zod schema for login requests.

**Schema:**
```typescript
{
  email: string().email().max(255),
  password: string().min(6).max(30)
}
```

**Example:**
```typescript
app.post('/api/login', async (req, res) => {
  const credentials = await validateRequestInputData(
    req, 
    res, 
    loginRequestValidationSchema
  );
  
  if (!credentials) return;
  
  // credentials.email and credentials.password are validated
  const user = await authenticateUser(credentials);
  // ...
});
```

### `registerRequestValidationSchema`

Pre-built Zod schema for registration requests.

**Schema:**
```typescript
{
  name: string().min(1).max(255),
  email: string().email().max(255),
  password: string().min(6).max(30),
  passwordConfirmation: string()
}
```

The schema includes a refinement to ensure `password` and `passwordConfirmation` match.

## TypeScript Interfaces

### `IApiResponse`

Extended Express Response type for better type safety.

```typescript
interface IApiResponse extends Response<any, Record<string, any>> {}
```

### `IApplyMiddlewareOptions`

Configuration options for `applyMiddlewaresOnApp`.

```typescript
interface IApplyMiddlewareOptions {
  applyCors?: boolean;
  corsOptions?: CorsOptions;
  expressJson?: boolean;
  expressUrlEncoded?: boolean;
  applyRateLimiter?: boolean;
  expressRateLimiter?: RateLimitRequestHandler;
}
```

### `IConfigureExpressBuildKitOptions`

Configuration options for `configureExpressBuildKit`.

```typescript
interface IConfigureExpressBuildKitOptions {
  rateLimiterOptions?: IExpressRateLimiterOptions;
  corsOptions?: IExpressCorsOptions;
  trustProxy?: boolean | string | number | string[] | ((ip: string) => boolean);
}
```

### `IExpressRateLimiterOptions`

Rate limiter configuration options (extends express-rate-limit Options).

```typescript
interface IExpressRateLimiterOptions extends Partial<Options> {}
```

Common options:
- `windowMs: number` - Time window in milliseconds
- `max: number` - Max requests per window
- `message: string` - Error message
- `standardHeaders: boolean` - Return rate limit info in headers
- `legacyHeaders: boolean` - Use legacy X-RateLimit headers

### `IExpressCorsOptions`

CORS configuration options (extends cors CorsOptions).

```typescript
interface IExpressCorsOptions extends CorsOptions {}
```

Common options:
- `origin: boolean | string | RegExp | (string | RegExp)[] | Function`
- `credentials: boolean`
- `methods: string | string[]`
- `allowedHeaders: string | string[]`
- `exposedHeaders: string | string[]`

### `IAuthCheckResultGeneric<A, B>`

Generic interface for authentication check results.

```typescript
interface IAuthCheckResultGeneric<A, B> {
  user: A;
  userRecord: B;
  isAdmin: boolean;
  isPlayer: boolean;
  isEngager: boolean;
  userId: string;
  userEmail: string;
  userPhoneNumber: string;
  userRole: RoleEnum;
  userPermissions: PermissionEnum[];
  [FormFieldsEnum.uniqueId]?: string;
}
```

This interface is useful when building authentication middleware that needs to attach user information to the request.

## Response Format

All API responses follow this consistent structure:

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

- `success` - Indicates if the operation was successful
- `message` - Human-readable message about the operation
- `result` - Container for response data
  - `data` - Single data object
  - `dataList` - Array of data objects
  - `authToken` - Authentication token (for login/register)
- `errors` - Array of error details
- `code` - Application-specific response code
- `status` - HTTP status code

## Best Practices

1. **Always use the provided response functions** for consistency across your API
2. **Configure global settings once** at application startup
3. **Use validation helpers** to ensure data integrity
4. **Apply middlewares early** in your application setup
5. **Handle validation failures** by checking the return value
6. **Use TypeScript** for better type safety and autocomplete
7. **Set appropriate CORS origins** in production (never use `*`)
8. **Configure rate limiting** based on your application needs
9. **Use the invalid request handler** as the last middleware

## Security Considerations

1. **CORS Configuration**: Never use `origin: '*'` in production. Always specify allowed origins.
2. **Rate Limiting**: Adjust rate limits based on your API usage patterns.
3. **Trust Proxy**: Set `trustProxy` appropriately when behind a reverse proxy.
4. **Input Validation**: Always validate user input using the validation helpers.
5. **Error Messages**: Don't expose sensitive information in error messages.

## Migration Guide

If migrating from an older version or from zaions-express-tool-kit:

1. Replace `configureZETK` with `configureExpressBuildKit`
2. Update import statements from `zaions-express-tool-kit` to `express-buildkit`
3. Review CORS configuration - it's now configurable instead of hardcoded `*`
4. Check rate limiter IP detection - it now uses improved detection logic

---

For more examples and use cases, see the [README.md](./README.md) file.