import { describe, expect, it } from 'vitest'

import { Url } from './url'

describe('url entity', () => {
  it('should be able to create a url entity', () => {
    const url = new Url({
      shortUrl: 'short-url',
      longUrl: 'long-url',
      userId: 'user-id',
    })

    expect(url).toBeInstanceOf(Url)
  })

  it('should be not able to create a url entity with no short url', () => {
    expect(() => {
      return new Url({
        longUrl: 'long-url',
        shortUrl: '',
        userId: 'user-id',
      })
    }).toThrow()
  })

  it('should be not able to create a url entity with no long url', () => {
    expect(() => {
      return new Url({
        longUrl: '',
        shortUrl: 'short-url',
        userId: 'user-id',
      })
    }).toThrow()
  })

  it('should be not able to create a url entity with no user', () => {
    expect(() => {
      return new Url({
        longUrl: 'long-url',
        shortUrl: 'short-url',
        userId: '',
      })
    }).toThrow()
  })
})
