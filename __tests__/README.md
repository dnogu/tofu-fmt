# GitHub Tofu Format Action - Test Suite

## Overview

This test suite provides comprehensive unit and integration tests for the GitHub Tofu Format Action, covering all possible configurations and real-world scenarios.

## Test Coverage

### Unit Tests (`__tests__/index.test.js`)
- **getFlag function**: Tests for boolean and string flag generation
- **buildTofuFmtCommand function**: Tests for all command variations and edge cases

### Integration Tests (`__tests__/integration.test.js`)
- **Basic formatting scenarios**: Standard formatting operations
- **CI/CD scenarios**: Automated pipeline formatting and checks
- **Development scenarios**: Local development formatting workflows
- **Module and project scenarios**: Large project and module formatting
- **Advanced formatting scenarios**: Complex formatting configurations
- **Real-world use cases**: Practical formatting scenarios
- **Edge cases and error scenarios**: Error handling and edge cases

## Test Fixtures (`__tests__/fixtures/`)
- `main.tf`: Example OpenTofu configuration with AWS resources
- `prod.tfvars`: Production variable values
- `dev.tfvars`: Development variable values

## Key Test Scenarios

### OpenTofu Format Tests
- Basic file formatting with write operation
- Formatting check without modifying files
- Recursive directory processing
- Diff output for formatting changes
- List control for output verbosity

### Command Generation Tests
- Default values are handled correctly
- Flag combinations work as expected
- Target file specification
- Boolean flag handling (true/false)
- String parameter handling

### CI/CD Integration Tests
- Pull request formatting checks
- Automated formatting in CI pipelines
- Pre-commit hook integration
- Module-specific formatting
- Silent formatting operations

## Running Tests

```bash
npm test
```

For coverage report:
```bash
npm run test -- --coverage
```

## Test Commands Covered

The tests verify generation of commands like:

```bash
# Basic formatting
tofu fmt

# Check formatting
tofu fmt --check --diff --recursive

# Format specific files
tofu fmt main.tf variables.tf

# Silent formatting
tofu fmt --list=false --recursive

# Dry-run check
tofu fmt --write=false --check --diff --recursive
```

## Test Results
- **Comprehensive test coverage** for all formatting scenarios
- **Error handling** for edge cases and invalid inputs
- **Integration scenarios** for real-world usage patterns
- **Command validation** ensuring correct tofu fmt usage

The test suite ensures that the GitHub Tofu Format Action correctly generates valid `tofu fmt` commands for all supported use cases and handles edge cases gracefully.
