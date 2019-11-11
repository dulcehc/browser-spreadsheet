import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { arrAlphabet } from '../../utils/constants'
import * as operations from '../../utils/operations'

const StyledCell = styled.td`
  input {
    width: calc(100% - 5px);
    height: 100%;
    border: none;
    font-size: 14px;
    padding-left: 5px;
    font-family: var(--font);
  }

  div {
    padding-left: 5px;
    cursor: pointer;
  }
`
const Cell = ({ numCol, numRow, onChangedValue, value, data }) => {
  const [ newValue, setNewValue ] = useState(value)
  const [ result, setResult ] = useState(null)

  const onChange = e => setNewValue(e.target.value)

  const onBlur = e => hasNewValue(e.target.value)

  const hasNewValue = value => {
    onChangedValue(
      {
        col: numCol,
        row: numRow,
      },
      value,
    )

    setResult( evaluateExpression( value ) )
  }

  const evaluateExpression = value => {
    if ( value.slice(0, 1) === '=' ) {
      value = operations.cleanExpression(value)
      if ( operations.isValidOperation(value) ) {
        /* eslint no-eval: 0 */
        // There is a previous validation to execute it only when it's a formula
        value = eval(value)
      } else {
        const arrOperation = operations.splitOperation(value)

        // Get the operating elements, which are even in the array
        // and check if all of them are valid
        const validFormula = arrOperation
          .filter( ( element, i ) => i % 2 === 0)
          .every( name => operations.isValidNameCell(name) || !isNaN(name) )

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
                // There is not data for the
                return '#ERROR!'
              }
            }
          }
          // Evaluate after replacing the formula with values
          value = eval(arrOperation.join(''))
        } else {
          value = '#INVALID!'
        }
      }
    }

    return value
  }

  return (
    <StyledCell>
      { numRow === 0 ? arrAlphabet[numCol]
        : numCol === 0 && numRow > 0 ? numRow
        : result ?
          <div onClick={() => setResult(null)}>{result}</div>
        :
          <input
            type='text'
            onBlur={onBlur}
            value={newValue}
            onChange={onChange}
          />
      }

    </StyledCell>
  )
}

Cell.propTypes = {
  /**
   * Number of the column.
   */
  numCol: PropTypes.number,
  /**
   * Number of the row.
   */
  numRow: PropTypes.number,
  /**
   * Function handler when a cell is being changed.
   */
  onChangedValue: PropTypes.func,
  /**
   * Value for the cell.
   */
  value: PropTypes.string,
  /**
   * Data from all the table.
   */
  data: PropTypes.object,
}

export default Cell