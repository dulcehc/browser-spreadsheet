import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Cell from '../Cell/Cell'

const StyledRow = styled.tr`
  &:first-child {
    text-align: center;
    font-weight: bold;
    background: var(--athens-gray);

    td {
      padding: 8px 0;
    }
  }

  td {
    border: 1px solid var(--pattens-blue);
    border-collapse: collapse;
    min-width: 120px;
    height: 30px;

    &:first-child {
      text-align: center;
      font-weight: bold;
      background: var(--athens-gray);
      width: 80px;
    }
  }
`

const Row = ({ numCols, numRow, onChangeCell, rowData, data }) => {
  return (
    <StyledRow>
      { [ ...Array( numCols ).keys() ]
          .map( ( col, i ) =>
            <Cell
              key={`${i}-${numRow}`}
              numRow={numRow}
              numCol={i}
              onChangedValue={onChangeCell}
              value={rowData[i] || ''}
              data={data}
            />
          )
      }
    </StyledRow>
  )
}

Row.propTypes = {
  /**
   * Number of columns.
   */
  numCols: PropTypes.number,
  /**
   * Number of rows.
   */
  numRow: PropTypes.number,
  /**
   * Function handler when a cell is being changed.
   */
  onChangeCell: PropTypes.func,
  /**
   * Object data for the current row.
   */
  rowData: PropTypes.object,
}

export default Row