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
      <Table nCols={5} nRows={5} />
    </StyledApp>
  )
}

export default App
