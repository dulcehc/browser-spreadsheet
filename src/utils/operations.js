import { spaceAndEqual, validExpression, operators, nameCell } from './regex'

export const cleanExpression = value => value.replace(spaceAndEqual, '')

export const isValidOperation = value => validExpression.test(value)

export const splitOperation = value => value.split(operators)

export const isValidNameCell = value => nameCell.test(value)

export const evaluateExpression = ( value, data ) => {
  if ( value.slice(0, 1) === '=' ) {
    value = cleanExpression(value)
    if ( isValidOperation(value) ) {
      /* eslint no-eval: 0 */
      // There is a previous validation to execute it only when it's a formula
      value = eval(value)
    } else {
      let arrOperation = splitOperation(value)

      // Get the operating elements, which are even in the array
      // and check if all of them are valid
      const validFormula = arrOperation
        .filter( ( element, i ) => i % 2 === 0)
        .every( name => isValidNameCell(name) || !isNaN(name) )

      if ( validFormula ) {
        for ( const [ i, element ] of arrOperation.entries() ) {
          if ( i % 2 === 0) {
            // Replace the name of the column with the value that contains
            if ( data[element.charAt(1)] ) {
              const cellData = data[element.charAt(1)][element.charAt(0)]

              if ( cellData ) {
                // replace value in original array
                arrOperation[i] = cellData
              } else {
                // cellData is undefined and does not contain a value
                return '#ERROR!'
              }
            } else {
              // cell has a value that doesn't contain a number
              if ( isNaN(element) ) {
                return '#ERROR!'
              }
            }
          }
        }

        const stringOperation = arrOperation.join('')
        // Evaluate string after replacing all the formula with numbers
        if ( isValidOperation( stringOperation ) ) {
          value = eval( stringOperation )
        } else {
          value = '#INVALID!'
        }
      } else {
        value = '#INVALID!'
      }
    }
  }

  return value
}
