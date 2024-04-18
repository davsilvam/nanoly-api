import { beforeEach, describe, expect, it } from 'vitest'

import { ShortenUrlUseCase } from './shorten-url'
import { ShortUrlAlreadyExistsError } from '../../errors/url/short-url-already-exists.error'
import { InMemoryUrlsRepository } from '../../repositories/url/in-memory-urls-repository'
import { InMemoryUsersRepository } from '../../repositories/user/in-memory-users-repository'

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

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toStrictEqual(expect.any(String))
  })

  it('should not be able to shorten an url with an existing short url', async () => {
    await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'existing-short-url',
      userId,
    })

    const result = await sut.execute({
      longUrl: 'https://www.yahoo.com',
      shortUrl: 'existing-short-url',
      userId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShortUrlAlreadyExistsError)
  })
})
