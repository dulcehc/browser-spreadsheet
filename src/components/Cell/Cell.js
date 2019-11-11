import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { arrAlphabet } from '../../utils/constants'
import { evaluateExpression } from '../../utils/operations'

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

    setResult( evaluateExpression( value, data ) )
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

Cell.defaultProps = {
  data: {}
}

export default Cell