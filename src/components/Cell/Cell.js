import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { arrAlphabet } from '../../utils/constants'

const StyledCell = styled.td`
  input {
    width: calc(100% - 5px);
    height: 100%;
    border: none;
    font-size: 14px;
    padding-left: 5px;
  }
`
const Cell = ({ numCol, numRow, onChangedValue, value }) => {
  const [ newValue, setNewValue ] = useState(value)

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
  }

  return (
    <StyledCell>
      { numRow === 0 ? arrAlphabet[numCol]
        : numCol === 0 && numRow > 0 ? numRow
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