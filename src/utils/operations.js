import { spaceAndEqual, validExpression } from './regex'

export const cleanExpression = value => value.replace(spaceAndEqual, '')

export const isValidOperation = value => validExpression.test(value)