# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Express BuildKit seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT:
- Open a public GitHub issue
- Post about it on social media
- Disclose the vulnerability publicly before it has been addressed

### Please DO:
- Email us at **aoneahsan@gmail.com** with the subject line "SECURITY: Express BuildKit"
- Provide detailed information about the vulnerability
- Include steps to reproduce if possible
- Allow us reasonable time to address the issue before public disclosure

### What to include in your report:

1. **Description** - A clear description of the vulnerability
2. **Impact** - What can an attacker achieve with this vulnerability?
3. **Affected versions** - Which versions of Express BuildKit are affected?
4. **Steps to reproduce** - Detailed steps to reproduce the vulnerability
5. **Proof of Concept** - If possible, include a minimal code example
6. **Suggested fix** - If you have ideas on how to fix it

### What to expect:

1. **Acknowledgment** - We'll acknowledge receipt of your report within 48 hours
2. **Initial Assessment** - Within 5 business days, we'll provide an initial assessment
3. **Resolution Timeline** - We'll work with you to understand and resolve the issue
4. **Credit** - We'll credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When using Express BuildKit in your applications:

### 1. CORS Configuration
```typescript
// ❌ DON'T use wildcard in production
configureExpressBuildKit({
  corsOptions: {
    origin: '*'
  }
});

// ✅ DO specify allowed origins
configureExpressBuildKit({
  corsOptions: {
    origin: ['https://myapp.com', 'https://api.myapp.com'],
    credentials: true
  }
});
```

### 2. Rate Limiting
```typescript
// ✅ Configure appropriate rate limits
configureExpressBuildKit({
  rateLimiterOptions: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Adjust based on your needs
    standardHeaders: true,
    legacyHeaders: false
  }
});
```

### 3. Trust Proxy Settings
```typescript
// ✅ Set trust proxy when behind a reverse proxy
configureExpressBuildKit({
  trustProxy: true // or specific proxy addresses
});
```

### 4. Input Validation
```typescript
// ✅ Always validate user input
const validatedData = await validateRequestInputData(req, res, schema);
if (!validatedData) return; // Validation failed, response sent

// ✅ Use strict schemas
const schema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(100)
});
```

### 5. Error Messages
```typescript
// ❌ DON'T expose sensitive information
sendApiFailedResponse(res, {
  message: 'Database error: Connection failed at 192.168.1.100',
  errors: [stackTrace]
});

// ✅ DO use generic error messages
sendApiFailedResponse(res, {
  message: 'An error occurred processing your request',
  code: 5000
});
```

## Known Security Considerations

1. **CORS Wildcard** - Previous versions used `origin: '*'` by default. This has been fixed in v1.0.0+
2. **IP Spoofing** - The rate limiter now uses improved IP detection, but ensure trust proxy is configured correctly
3. **Dependency Security** - We regularly update dependencies to patch known vulnerabilities

## Security Updates

Security updates will be released as:
- **Patch versions** (1.0.x) for non-breaking security fixes
- **Minor versions** (1.x.0) if security fixes require small breaking changes
- **Major versions** (x.0.0) if security fixes require significant breaking changes

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Contact

For security concerns, contact: **aoneahsan@gmail.com**

For general support, see [SUPPORT.md](./SUPPORT.md)

---

Thank you for helping keep Express BuildKit and its users safe!