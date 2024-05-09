import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidShortUrlError } from './errors/invalid-short-url.error'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists.error'
import { UrlNotFoundError } from './errors/url-not-found.error'
import { UpdateUrlUseCase } from './update-url'

import { InMemoryUrlsRepository } from '@/infra/database/in-memory/repositories/in-memory-urls-repository'

let urlsRepository: InMemoryUrlsRepository
let sut: UpdateUrlUseCase

describe('update url use case', () => {
  beforeEach(() => {
    urlsRepository = new InMemoryUrlsRepository()
    sut = new UpdateUrlUseCase(urlsRepository)
  })

  it('should be able to update a url by id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('Url not found.')

    const result = await sut.execute({
      id: url.id,
      longUrl: 'https://www.google.com.br',
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toBeUndefined()

    const updatedUrl = await urlsRepository.findById(urlId)

    expect(updatedUrl).toStrictEqual({
      ...url,
      longUrl: 'https://www.google.com.br',
    })
  })

  it('should not be able to update a url with an invalid short url', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('Url not found.')

    const result = await sut.execute({
      id: url.id,
      shortUrl: 'goo',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidShortUrlError)
  })

  it('should not be able to update a url with an existing short url', async () => {
    await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google2',
      userId: 'user-id',
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('Url not found.')

    const result = await sut.execute({
      id: url.id,
      shortUrl: 'google',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(ShortUrlAlreadyExistsError)
  })

  it('should not be able to update a url by a non-existent id', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      longUrl: 'https://www.google.com.br',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UrlNotFoundError)
  })
})
