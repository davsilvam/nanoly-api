import { beforeEach, describe, expect, it } from 'vitest'

import { UrlNotFoundError } from './errors/url-not-found.error'
import { GetRedirectUrlUseCase } from './get-redirect-url'
import { InMemoryUrlsRepository } from '../../../infra/repositories/in-memory/in-memory-urls-repository'

let urlsRepository: InMemoryUrlsRepository
let sut: GetRedirectUrlUseCase

describe('get redirect url url case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    sut = new GetRedirectUrlUseCase(urlsRepository)
  })

  it('should be able to get a url by short url', async () => {
    await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const result = await sut.execute({ shortUrl: 'google' })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toBe('https://www.google.com')
  })

  it('should not be able to get a url by a non-existent short url', async () => {
    const result = await sut.execute({ shortUrl: 'non-existent-short-url' })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UrlNotFoundError)
  })

  it('should increment the clicks count when getting a url by short url', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    expect(url).not.toBeNull()
    expect(url?.clicksCount).toBe(0)

    await sut.execute({ shortUrl: 'google' })

    const incrementedUrl = await urlsRepository.findById(urlId)

    expect(incrementedUrl?.clicksCount).toBe(1)
  })
})
