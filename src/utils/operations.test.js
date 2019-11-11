import { evaluateExpression } from './operations';

describe('Cell operations', () => {
  test('the sum of the formula 1+2 is 3', () => {
    const sumFormula = '=1+2'
    expect( evaluateExpression(sumFormula) ).toBe( 3 )
  })

  test('invalid cell when a non-number is entered in a formula', () => {
    const noNumberFormula = '=!'
    expect( evaluateExpression(noNumberFormula) ).toBe( '#INVALID!' )
  })

  test('error message when you include an empty cell in the formula', () => {
    const emptyCell = '=A1'
    const data = {}
    expect( evaluateExpression(emptyCell, data) ).toBe( '#ERROR!' )
  })

  test('invalid operation when a string is included in the formula', () => {
    const formula = '=A2*B2'
    const data = {
      2: { A: 1, B: 'hello'}
    }
    expect( evaluateExpression(formula, data) ).toBe( '#INVALID!' )
  })

  test('display same content in the cell when there is no equal sign for formula', () => {
    const cellContent = 'my new cell'
    expect( evaluateExpression(cellContent) ).toBe( cellContent )
  })

  test('return single value without equal sign', () => {
    const cellContent = '=1'
    expect( evaluateExpression(cellContent) ).toBe( 1 )
  })

  test('return the operation of three cells', () => {
    const formula = '=A1+B3+C1'
    const data = {
      1: {B: 'A1', A: '10', C: '20'},
      2: {B: '=B1+2', C: '=1*67'},
      3: {B: '40', D: '=A1+B3+C1'}
    }
    // 10 + 40 + 20
    expect( evaluateExpression(formula, data) ).toBe( 70 )
  })

  test('should return the operation of decimals', () => {
    const formula = '=A1*0.5'
    const data = {
      1: {B: 'A1', A: '10', C: '20'},
      2: {B: '=B1+2', C: '=1*67'},
      3: {B: '40', D: '=A1+B3+C1'}
    }
    // 10 * 0.5
    expect( evaluateExpression(formula, data) ).toBe( 5 )
  })

})
