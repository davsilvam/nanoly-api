import { beforeEach, describe, expect, it } from 'vitest'

import { FindUrlByShortUrlUseCase } from './find-url-by-short-url'
import { UrlNotFoundError } from '../../errors/url/url-not-found.error'
import { InMemoryUrlsRepository } from '../../repositories/url/in-memory-urls-repository'

let urlsRepository: InMemoryUrlsRepository
let sut: FindUrlByShortUrlUseCase

describe('find url by short url case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    sut = new FindUrlByShortUrlUseCase(urlsRepository)
  })

  it('should be able to get a url by short url', async () => {
    await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const result = await sut.execute({ shortUrl: 'google' })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value.longUrl).toBe('https://www.google.com')
    expect(result.isRight() && result.value.shortUrl).toBe('google')
  })

  it('should not be able to get a url by a non-existent short url', async () => {
    const result = await sut.execute({ shortUrl: 'non-existent-short-url' })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UrlNotFoundError)
  })

  it('should increment the clicks count when getting a url by short url', async () => {
    await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findByShortUrl('google')

    expect(url).not.toBeNull()
    expect(url?.clicksCount).toBe(0)

    await sut.execute({ shortUrl: 'google' })

    const incrementedUrl = await urlsRepository.findByShortUrl('google')

    expect(incrementedUrl?.clicksCount).toBe(1)
  })
})
