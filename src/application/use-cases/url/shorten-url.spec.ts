import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidShortUrlError } from './errors/invalid-short-url.error'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists.error'
import { ShortenUrlUseCase } from './shorten-url'
import { InMemoryUrlsRepository } from '../../../infra/repositories/in-memory/in-memory-urls-repository'
import { InMemoryUsersRepository } from '../../../infra/repositories/in-memory/in-memory-users-repository'

let urlsRepository: InMemoryUrlsRepository
let usersRepository: InMemoryUsersRepository
let sut: ShortenUrlUseCase

let userId: string

describe('shorten url use case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new ShortenUrlUseCase(urlsRepository, usersRepository)

    userId = await usersRepository.create({
      email: 'email',
      name: 'name',
      passwordHash: 'hash',
    })
  })

  it('should be able to shorten an url', async () => {
    const result = await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const url = await urlsRepository.findByShortUrl('google')

    if (!url)
      throw new Error('Url not found.')

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toEqual(url.id)
  })

  it('should not be able to shorten an url with less than 4 characters', async () => {
    const result = await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'goo',
      userId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidShortUrlError)
  })

  it('should not be able to shorten an url with more than 16 characters', async () => {
    const result = await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'google-is-the-best',
      userId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(InvalidShortUrlError)
  })

  it('should not be able to shorten an url with an existing short url', async () => {
    await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'existing-url',
      userId,
    })

    const result = await sut.execute({
      longUrl: 'https://www.yahoo.com',
      shortUrl: 'existing-url',
      userId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(ShortUrlAlreadyExistsError)
  })
})
