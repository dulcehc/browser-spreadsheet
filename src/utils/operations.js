import { spaceAndEqual, validExpression, operators, nameCell } from './regex'

export const cleanExpression = value => value.replace(spaceAndEqual, '')

export const isValidOperation = value => validExpression.test(value)

export const splitOperation = value => value.split(operators)

export const isValidNameCell = value => nameCell.test(value)