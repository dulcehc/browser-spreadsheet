import React from 'react'
import Table from './components/Table/Table'
import styled from 'styled-components'

import './index.css'

const StyledApp = styled.div`
  overflow: auto;
`
function App() {
  return (
    <StyledApp>
      {/** Cols A ~ Z, Rows 1 ~ 50 */}
      <Table nCols={26} nRows={50} />
    </StyledApp>
  )
}

export default App
