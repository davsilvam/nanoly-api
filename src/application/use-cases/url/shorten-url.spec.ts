import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidShortUrlError } from './errors/invalid-short-url.error'
import { ShortUrlAlreadyExistsError } from './errors/short-url-already-exists.error'
import { ShortenUrlUseCase } from './shorten-url'

import { Url } from '@/domain/entities/url.entity'
import { User } from '@/domain/entities/user.entity'
import { InMemoryUrlsRepository } from '@/infra/database/in-memory/repositories/in-memory-urls-repository'
import { InMemoryUsersRepository } from '@/infra/database/in-memory/repositories/in-memory-users-repository'

let urlsRepository: InMemoryUrlsRepository
let usersRepository: InMemoryUsersRepository
let sut: ShortenUrlUseCase

let userId: string

describe('shorten url use case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new ShortenUrlUseCase(urlsRepository, usersRepository)

    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash: 'password',
    })

    await usersRepository.create(user)

    userId = user.id
  })

  it('should be able to shorten an url', async () => {
    const result = await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toBeInstanceOf(Url)
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
