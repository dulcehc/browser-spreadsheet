import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Row from '../Row/Row'
import { arrAlphabet, maxCols, maxRows } from '../../utils/constants'
import { splitOperation } from '../../utils/operations'

const StyledTable = styled.table`
  border: 1px solid var(--pattens-blue);
  border-collapse: collapse;
`

const StyledMessage = styled.div`
  font-weight: 400;
  margin-top: 25px;
`

const Table = ({ nCols, nRows }) => {
  const [ data, setData ] = useState({})
  let messages = []

  if ( nCols > maxCols ) {
    nCols = maxCols
    messages.push(`The maximum number of columns is ${maxCols}`)
  }

  if ( nRows > maxRows ) {
    nRows = maxRows
    messages.push(`The maximum number of rows is ${maxRows}`)
  }

  const handleChangeCell = ({ col, row }, value) => {
    const modifiedData = { ...data }
    if ( !modifiedData[row] ) {
      modifiedData[row] = {}
    }

    if( value ) {
      // Remove equal sign when it's a single value
      if ( splitOperation(value).length === 1 && value.charAt(0) === '=' ) {
        value = value.substr(1)
      }

      col = arrAlphabet[col]
      modifiedData[row][col] = value
      setData( modifiedData )
    }
  }

  return (
    <>
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
              data={data}
            />
          )
        })
      }
      </tbody>
    </StyledTable>

    <StyledMessage>
        {messages.map((message, i) => <p key={i}>{ message }</p>)}
      </StyledMessage>
    </>
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