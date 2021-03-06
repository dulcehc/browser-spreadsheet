import { validExpression, nameCell } from './regex';

describe('Regex expressions', () => {
  test('should match the sum of two numbers', () => {
    const sum = '1+2'
    expect(validExpression.test(sum)).toBe(true);
  })

  test('should not match an expression with letters', () => {
    const alphanumeric = '1+a-b'
    expect(validExpression.test(alphanumeric)).toBe(false);
  })

  test('should match an expression with sum, subtraction, multiplication and division', () => {
    const allOperations = '-6.5-5.3*4.977/2'
    expect(validExpression.test(allOperations)).toBe(true);
  })

  test('should match an expression with decimal values', () => {
    const decimal = '10.5*3'
    expect(validExpression.test(decimal)).toBe(true);
  })

  test('should accept A1 as valid cell name', () => {
    const name = 'A1'
    expect(nameCell.test(name)).toBe(true);
  })

  test('should accept Z52 as invalid cell name', () => {
    const name = 'Z52'
    expect(nameCell.test(name)).toBe(false);
  })
})