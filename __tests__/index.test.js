const { getFlag, buildTofuFmtCommand } = require('../index');

describe('OpenTofu Format Action Tests', () => {
  describe('getFlag function', () => {
    test('should return empty string for undefined boolean values', () => {
      expect(getFlag('test', undefined)).toBe('');
      expect(getFlag('test', null)).toBe('');
    });

    test('should return flag for true boolean values', () => {
      expect(getFlag('check', 'true')).toBe('--check');
      expect(getFlag('diff', 'true')).toBe('--diff');
    });

    test('should return empty string for false boolean values', () => {
      expect(getFlag('check', 'false')).toBe('');
      expect(getFlag('diff', 'false')).toBe('');
    });

    test('should return flag=value for string types', () => {
      expect(getFlag('target', 'main.tf', 'string')).toBe('--target=main.tf');
      expect(getFlag('output', 'formatted.tf', 'string')).toBe('--output=formatted.tf');
    });

    test('should return empty string for empty string values', () => {
      expect(getFlag('target', '', 'string')).toBe('');
      expect(getFlag('target', null, 'string')).toBe('');
      expect(getFlag('target', undefined, 'string')).toBe('');
    });
  });

  describe('buildTofuFmtCommand function', () => {
    test('should generate basic tofu fmt command', () => {
      const inputs = {};
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt');
    });

    test('should add check flag', () => {
      const inputs = {
        check: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --check');
    });

    test('should add diff flag', () => {
      const inputs = {
        diff: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --diff');
    });

    test('should add recursive flag', () => {
      const inputs = {
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --recursive');
    });

    test('should disable list when false', () => {
      const inputs = {
        list: 'false'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --list=false');
    });

    test('should disable write when false', () => {
      const inputs = {
        write: 'false'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --write=false');
    });

    test('should add target files', () => {
      const inputs = {
        target: 'main.tf'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt main.tf');
    });

    test('should combine multiple flags', () => {
      const inputs = {
        check: 'true',
        diff: 'true',
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --check --diff --recursive');
    });

    test('should handle complex command with all options', () => {
      const inputs = {
        list: 'false',
        write: 'false',
        diff: 'true',
        check: 'true',
        recursive: 'true',
        target: 'main.tf variables.tf'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --list=false --write=false --diff --check --recursive main.tf variables.tf');
    });

    test('should ignore false flags (default behavior)', () => {
      const inputs = {
        check: 'false',
        diff: 'false',
        recursive: 'false'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt');
    });

    test('should handle empty target', () => {
      const inputs = {
        target: '',
        check: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --check');
    });

    test('should handle undefined inputs gracefully', () => {
      const inputs = {
        check: undefined,
        diff: null,
        recursive: 'true'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --recursive');
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle mixed valid and invalid inputs', () => {
      const inputs = {
        check: 'true',
        diff: 'true',
        invalidOption: 'should-be-ignored',
        target: 'main.tf'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt --check --diff main.tf');
    });

    test('should handle all false values', () => {
      const inputs = {
        list: 'true', // default, should not appear
        write: 'true', // default, should not appear
        diff: 'false',
        check: 'false',
        recursive: 'false'
      };
      expect(buildTofuFmtCommand(inputs)).toBe('tofu fmt');
    });
  });
});
