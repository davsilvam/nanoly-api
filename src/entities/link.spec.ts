import { describe, expect, it } from 'vitest'

import { Link } from './link'

describe('link Entity', () => {
  it('should be able to create a link entity', () => {
    const link = new Link({
      shortUrl: 'short-url',
      longUrl: 'long-url',
      userId: 'user-id',
    })

    expect(link).toBeInstanceOf(Link)
  })

  it('should be not able to create a link entity with no short url', () => {
    expect(() => {
      return new Link({
        longUrl: 'long-url',
        shortUrl: '',
        userId: 'user-id',
      })
    }).toThrow()
  })

  it('should be not able to create a link entity with no long url', () => {
    expect(() => {
      return new Link({
        longUrl: '',
        shortUrl: 'short-url',
        userId: 'user-id',
      })
    }).toThrow()
  })

  it('should be not able to create a link entity with no user', () => {
    expect(() => {
      return new Link({
        longUrl: 'long-url',
        shortUrl: 'short-url',
        userId: '',
      })
    }).toThrow()
  })
})
