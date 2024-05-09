import { describe, expect, it } from 'vitest'

describe('either handler', () => {
  it('should be able to handle left and right values', () => {
    const leftValue = 'Left Value'
    const rightValue = 'Right Value'

    const left = (value: string) => ({ isLeft: true, value })
    const right = (value: string) => ({ isRight: true, value })

    const leftResult = left(leftValue)
    const rightResult = right(rightValue)

    expect(leftResult.isLeft).toBe(true)
    expect(leftResult.value).toBe(leftValue)
    expect(rightResult.isRight).toBe(true)
    expect(rightResult.value).toBe(rightValue)
  })
})
