import { beforeEach, describe, expect, it } from 'vitest'

import { UrlNotFoundError } from './errors/url-not-found.error'
import { GetRedirectUrlUseCase } from './get-redirect-url'

import { Url } from '@/domain/entities/url.entity'
import { InMemoryUrlsRepository } from '@/infra/database/in-memory/repositories/in-memory-urls-repository'

let urlsRepository: InMemoryUrlsRepository
let sut: GetRedirectUrlUseCase

describe('get redirect url url case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    sut = new GetRedirectUrlUseCase(urlsRepository)
  })

  it('should be able to get a url by short url', async () => {
    const url = Url.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'another-user-id',
    })

    await urlsRepository.create(url)

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
    const url = Url.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'another-user-id',
    })

    await urlsRepository.create(url)

    expect(url).not.toBeNull()
    expect(url.clicksCount).toBe(0)

    await sut.execute({ shortUrl: 'google' })

    const incrementedUrl = await urlsRepository.findById(url.id)

    expect(incrementedUrl?.clicksCount).toBe(1)
  })
})
