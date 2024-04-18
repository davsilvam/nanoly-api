import { beforeEach, describe, expect, it } from 'vitest'

import { FindUrlByShortUrlUseCase } from './find-url-by-short-url'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import { InMemoryUrlsRepository } from '../../repositories/url/in-memory-urls-repository'

let urlsRepository: InMemoryUrlsRepository
let sut: FindUrlByShortUrlUseCase

describe('find url by short url case', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository()
    sut = new FindUrlByShortUrlUseCase(urlsRepository)
  })

  it('should be able to get a url by short url', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('Url not found.')

    const result = await sut.execute({ shortUrl: url.shortUrl })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value.longUrl).toBe('https://www.google.com')
    expect(result.isRight() && result.value.shortUrl).toBe('google')
    expect(result.isRight() && result.value.userId).toBe('user-id')
  })

  it('should not be able to get a url by a non-existent short url', async () => {
    const result = await sut.execute({ shortUrl: 'non-existent-short-url' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UrlNotFoundError)
  })
})
