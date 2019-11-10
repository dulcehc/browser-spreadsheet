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
const Cell = ({ numCol, numRow, onChangedValue, value }) => {
  const [ newValue, setNewValue ] = useState(value)
  const [ result, setResult ] = useState(null)

  const onChange = e => {
    console.log('on change: ', e.target.value)
    setNewValue(e.target.value)
  }

  const onBlur = e => {
    console.log('on blur: ', e.target.value)
    hasNewValue(e.target.value)
  }

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
    console.log('evaluate expression: ', value)
    if ( value.slice(0, 1) === '=' ) {
      value = operations.cleanExpression(value)
      if ( operations.isValidOperation(value) ) {
        value = eval(value)
      } else {
        value = '#INVALID!'
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
}

export default Cell