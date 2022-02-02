const inputFormatter = require('../../utils/inputFormatter');

describe('inputFormatter util', () => {
  test('should return string without spaces at the beginning and at the end of the line', () => {
    expect(inputFormatter('   without spaces   ')).toBe('without spaces');
  });

  test('should return an empty string', () => {
    expect(inputFormatter('     ')).toBe('');
  });

  test('should return string in lowercase', () => {
    expect(inputFormatter('UPPERCASE')).toBe('uppercase');
  });
});
