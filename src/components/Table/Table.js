import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Row from '../Row/Row'
import { arrAlphabet } from '../../utils/constants'

const StyledTable = styled.table`
  border: 1px solid var(--pattens-blue);
  border-collapse: collapse;
`

const Table = ({ nCols, nRows }) => {
  const [ data, setData ] = useState({})

  const handleChangeCell = ({ col, row }, value) => {
    const modifiedData = { ...data }
    if ( !modifiedData[row] ) {
      modifiedData[row] = {}
    }

    if( value ) {
      col = arrAlphabet[col]
      modifiedData[row][col] = value
      setData( modifiedData )
    }
  }

  return (
    <StyledTable>
      <tbody>
      { [ ...Array( nRows + 1 ).keys() ]
        .map(( row, i ) => {
          const rowData = data.i || {}
          return (
            <Row
              onChangeCell={handleChangeCell}
              key={`row-${i}`}
              numRow={i}
              numCols={nCols + 1}
              rowData={rowData}
            />
          )
        })
      }
      </tbody>

    </StyledTable>
  )
}

Table.propTypes = {
  /**
   * Number of columns.
   */
  nCols: PropTypes.number,
  /**
   * Number of rows.
   */
  nRows: PropTypes.number
}

Table.defaultProps = {
  nCols: 4,
  nRows: 4
}

export default Table