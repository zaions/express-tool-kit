# Contributing to Express BuildKit

First off, thank you for considering contributing to Express BuildKit! It's people like you that make Express BuildKit such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the [Express BuildKit Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to aoneahsan@gmail.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, please include as many details as possible:

**Bug Report Template:**
- **Description**: A clear and concise description of the bug
- **Steps to Reproduce**: Steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable, add screenshots
- **Environment**:
  - Node.js version
  - Express version
  - Express BuildKit version
  - Operating System

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use case**: Describe the use case for this enhancement
- **Current behavior**: What currently happens
- **Desired behavior**: What you would like to happen
- **Possible implementation**: If you have ideas on how to implement it

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code follows the existing style.
6. Issue that pull request!

## Development Process

### Setting Up Your Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/express-buildkit.git
   cd express-buildkit
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Link Local Dependencies** (if working with zaions-tool-kit)
   ```bash
   yarn run update:linked-packages
   ```

4. **Start Development**
   ```bash
   yarn dev
   ```

### Development Commands

- `yarn dev` - Start development with watch mode
- `yarn build` - Build the package
- `yarn test` - Run tests
- `yarn run serve` - Build once with linked packages

### Code Style

We use TypeScript and follow these conventions:

1. **Use TypeScript** - All new code should be written in TypeScript
2. **Type Safety** - Avoid using `any` type unless absolutely necessary
3. **Naming Conventions**:
   - Interfaces: PascalCase with `I` prefix (e.g., `IApiResponse`)
   - Functions: camelCase (e.g., `sendApiResponse`)
   - Constants: UPPER_SNAKE_CASE
   - Files: camelCase for `.ts` files

4. **File Organization**:
   ```
   src/
   ├── configure/     # Configuration functions
   ├── middlewares/   # Express middleware functions
   ├── types/         # TypeScript type definitions
   ├── utils/         # Utility functions
   │   └── helpers/   # Helper functions by category
   └── validationSchema/ # Zod validation schemas
   ```

5. **Imports**: Use path aliases (`@helpers`, `@enums`, `@zTypes`, `@src`)

### Testing

1. **Write Tests**: All new features should have corresponding tests
2. **Test Files**: Place test files next to the code they test with `.test.ts` extension
3. **Run Tests**: Use `yarn test` to run all tests
4. **Test Coverage**: Aim for high test coverage for new code

Example test:
```typescript
import { describe, it, expect } from 'vitest';
import { sendApiSuccessResponse } from './apiHelpers';

describe('sendApiSuccessResponse', () => {
  it('should send a 200 response with success true', () => {
    // Test implementation
  });
});
```

### Documentation

1. **API Documentation**: Update `DOCUMENTATION.md` for any API changes
2. **README**: Update examples if adding new features
3. **JSDoc Comments**: Add JSDoc comments to exported functions
4. **Type Definitions**: Ensure all exports have proper TypeScript types

### Commit Messages

We follow conventional commit messages:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add custom error handler middleware
fix: correct CORS origin validation
docs: update API documentation for new functions
```

### Release Process

1. **Version Bump**: Update version in `package.json`
2. **Update CHANGELOG**: Document changes in `CHANGELOG.md`
3. **Build**: Run `yarn build`
4. **Test**: Ensure all tests pass
5. **Tag**: Create a git tag for the version
6. **Publish**: Use `yarn deploy` (maintainers only)

## Project Structure

```
express-buildkit/
├── src/                    # Source code
│   ├── configure/         # Configuration functions
│   ├── enums/            # Enumerations (currently empty)
│   ├── middlewares/      # Express middlewares
│   ├── privateModule/    # Internal modules (not exported)
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── validationSchema/ # Zod schemas
│   └── index.ts          # Main entry point
├── dist/                  # Built files (generated)
├── tests/                 # Test files
├── DOCUMENTATION.md       # API documentation
├── README.md             # Project overview
├── CHANGELOG.md          # Version history
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
└── vitest.config.ts      # Test configuration
```

## Review Process

1. **Automated Checks**: All PRs run automated tests and linting
2. **Code Review**: At least one maintainer will review your PR
3. **Feedback**: Be open to feedback and requested changes
4. **Approval**: Once approved, your PR will be merged

## Questions?

Feel free to:
- Open an issue for questions
- Email aoneahsan@gmail.com
- Start a discussion in GitHub Discussions

## Recognition

Contributors will be recognized in:
- The project's contributors list
- Release notes for significant contributions
- Special mentions for exceptional contributions

Thank you for contributing to Express BuildKit! 🎉