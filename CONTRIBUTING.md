# Contributing to GitHub Tofu Format Action

Thank you for your interest in contributing to the GitHub Tofu Format Action! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Git
- OpenTofu installed locally for testing

### Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/tofu-fmt.git
cd tofu-fmt
```

2. Install dependencies:
```bash
npm install
```

3. Run tests to ensure everything is working:
```bash
npm test
```

## Development Process

### Code Structure

- `action.yml` - GitHub Action metadata and input/output definitions
- `index.js` - Main action logic and tofu fmt command building
- `__tests__/` - Test files (unit and integration tests)
- `__tests__/fixtures/` - Test fixtures and example files
- `dist/` - Built action files (auto-generated)

### Making Changes

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following the coding standards
3. Add or update tests as needed
4. Run the test suite:
```bash
npm test
```

5. Build the action:
```bash
npm run build
```

6. Commit your changes with a descriptive message
7. Push to your fork and create a pull request

### Testing

We maintain comprehensive test coverage for all functionality:

- **Unit tests**: Test individual functions and components
- **Integration tests**: Test real-world scenarios and command generation
- **Fixtures**: Example OpenTofu files for testing

Run tests with:
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Code Style

- Use ES6+ JavaScript features
- Follow existing code formatting and style
- Add JSDoc comments for public functions
- Keep functions small and focused
- Use descriptive variable and function names

### Adding New Features

When adding new features:

1. Check the [OpenTofu fmt documentation](https://opentofu.org/docs/cli/commands/fmt/) for any new options
2. Update `action.yml` with new inputs/outputs
3. Update `index.js` with the new functionality
4. Add comprehensive tests for the new feature
5. Update the README.md with documentation
6. Update examples if needed

### Updating Dependencies

When updating dependencies:

1. Test thoroughly to ensure compatibility
2. Update package.json and package-lock.json
3. Run the full test suite
4. Update any affected documentation

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update tests to cover your changes
3. Update documentation as needed
4. Ensure all tests pass
5. Update the README.md if you've added new functionality
6. Create a clear pull request description explaining:
   - What changes you made
   - Why you made them
   - How to test them

### Pull Request Requirements

- [ ] Tests pass
- [ ] Code follows project standards
- [ ] Documentation updated if needed
- [ ] New functionality includes tests
- [ ] Breaking changes are clearly documented

## Reporting Issues

When reporting issues:

1. Use the issue template if available
2. Provide a clear description of the problem
3. Include steps to reproduce the issue
4. Provide example inputs/outputs if relevant
5. Include your environment details (OS, Node.js version, etc.)

## Feature Requests

For feature requests:

1. Check existing issues to avoid duplicates
2. Clearly describe the feature and its benefits
3. Provide examples of how it would be used
4. Consider if it aligns with the action's goals

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow GitHub's community guidelines

## Questions?

If you have questions about contributing:

- Check the existing issues and discussions
- Create a new issue with the "question" label
- Reach out to the maintainers

## Recognition

Contributors will be recognized in:

- The project's README.md
- Release notes for significant contributions
- GitHub's contributor graphs

Thank you for contributing to make OpenTofu formatting easier for everyone!
