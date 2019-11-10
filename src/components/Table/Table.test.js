import React from 'react'
import { create } from 'react-test-renderer'

import Table from './Table'

describe('Table component', () => {
  test('Display default cols and rows when they are not provided', () => {
    const table = create( <Table /> )
    expect(table.toJSON()).toMatchSnapshot()
  })

  test('Display maximum cols when the cols provided are greater than 26', () => {
    const table = create( <Table nCols={28} nRows={4}/> )
    expect(table.toJSON()).toMatchSnapshot()
  })

  test('Display maximum rows when the rows provided are greater than 50', () => {
    const table = create( <Table nCols={10} nRows={51}/> )
    expect(table.toJSON()).toMatchSnapshot()
  })
})
