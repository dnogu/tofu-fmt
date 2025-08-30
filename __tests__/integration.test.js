const { buildTofuFmtCommand } = require('../index');

describe('OpenTofu Format Integration Tests', () => {
  describe('Basic formatting scenarios', () => {
    test('should generate command for basic file formatting', () => {
      const inputs = {
        write: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --recursive');
    });

    test('should generate command for formatting check', () => {
      const inputs = {
        check: 'true',
        diff: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --check --recursive');
    });

    test('should generate command for specific files', () => {
      const inputs = {
        target: 'main.tf variables.tf outputs.tf',
        check: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --check main.tf variables.tf outputs.tf');
    });
  });

  describe('CI/CD scenarios', () => {
    test('should generate command for pull request checks', () => {
      const inputs = {
        check: 'true',
        diff: 'true',
        recursive: 'true',
        list: 'true' // default
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --check --recursive');
    });

    test('should generate command for automated formatting', () => {
      const inputs = {
        write: 'true', // default
        diff: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --recursive');
    });

    test('should generate command for pre-commit hooks', () => {
      const inputs = {
        write: 'true', // default
        list: 'false',
        target: 'main.tf'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --list=false main.tf');
    });
  });

  describe('Development scenarios', () => {
    test('should generate command for local development formatting', () => {
      const inputs = {
        diff: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --recursive');
    });

    test('should generate command for checking single file', () => {
      const inputs = {
        target: 'main.tf',
        check: 'true',
        diff: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --check main.tf');
    });

    test('should generate command for silent formatting', () => {
      const inputs = {
        list: 'false',
        write: 'true' // default
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --list=false');
    });
  });

  describe('Module and project scenarios', () => {
    test('should generate command for formatting entire project', () => {
      const inputs = {
        recursive: 'true',
        diff: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --recursive');
    });

    test('should generate command for checking module formatting', () => {
      const inputs = {
        target: './modules',
        check: 'true',
        recursive: 'true',
        diff: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --check --recursive ./modules');
    });

    test('should generate command for formatting specific module files', () => {
      const inputs = {
        target: './modules/vpc/main.tf ./modules/vpc/variables.tf',
        write: 'true', // default
        diff: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff ./modules/vpc/main.tf ./modules/vpc/variables.tf');
    });
  });

  describe('Advanced formatting scenarios', () => {
    test('should generate command for dry-run formatting check', () => {
      const inputs = {
        write: 'false',
        check: 'true',
        diff: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --write=false --diff --check --recursive');
    });

    test('should generate command for formatting with minimal output', () => {
      const inputs = {
        list: 'false',
        write: 'true', // default
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --list=false --recursive');
    });

    test('should generate command for comprehensive format check', () => {
      const inputs = {
        list: 'true', // default
        write: 'false',
        diff: 'true',
        check: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --write=false --diff --check --recursive');
    });
  });

  describe('Real-world use cases', () => {
    test('should generate command for GitHub Actions CI check', () => {
      const inputs = {
        check: 'true',
        diff: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --check --recursive');
    });

    test('should generate command for automated formatting in CI', () => {
      const inputs = {
        write: 'true', // default
        diff: 'true',
        recursive: 'true',
        list: 'false'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --list=false --diff --recursive');
    });

    test('should generate command for local pre-commit validation', () => {
      const inputs = {
        check: 'true',
        diff: 'true',
        target: 'main.tf variables.tf'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --check main.tf variables.tf');
    });

    test('should generate command for formatting terraform documentation examples', () => {
      const inputs = {
        target: './examples',
        recursive: 'true',
        write: 'true', // default
        diff: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff --recursive ./examples');
    });
  });

  describe('Edge cases and error scenarios', () => {
    test('should handle empty inputs gracefully', () => {
      const inputs = {};
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt');
    });

    test('should handle all undefined inputs', () => {
      const inputs = {
        target: undefined,
        list: undefined,
        write: undefined,
        diff: undefined,
        check: undefined,
        recursive: undefined
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt');
    });

    test('should handle mixed undefined and valid inputs', () => {
      const inputs = {
        target: undefined,
        check: 'true',
        diff: undefined,
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --check --recursive');
    });
  });
});
