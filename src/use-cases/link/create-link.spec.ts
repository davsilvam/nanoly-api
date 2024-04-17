import { beforeEach, describe, expect, it } from 'vitest'
import { CreateLinkUseCase } from './create-link'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { ShortUrlAlreadyExistsError } from '../../errors/link/short-url-already-exists.error'
import { InMemoryUserRepository } from '../../repositories/user/in-memory-user-repository'

let linkRepository: InMemoryLinkRepository
let userRepository: InMemoryUserRepository
let sut: CreateLinkUseCase

let userId: string

describe('Create Link Use Case', () => {
  beforeEach(async () => {
    linkRepository = new InMemoryLinkRepository()
    userRepository = new InMemoryUserRepository()
    sut = new CreateLinkUseCase(linkRepository, userRepository)

    userId = await userRepository.create({
      email: 'email',
      name: 'name',
      passwordHash: 'hash',
    })
  })

  it('should be able to create a link', async () => {
    const result = await sut.execute({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toStrictEqual(expect.any(String))
  })

  it('should not be able to create a link with an existing short url', async () => {
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
