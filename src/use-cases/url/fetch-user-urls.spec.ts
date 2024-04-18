import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUserURLsUseCase } from './fetch-user-urls'
import { URL } from '../../entities/url'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import { InMemoryURLsRepository } from '../../repositories/url/in-memory-urls-repository'
import { InMemoryUsersRepository } from '../../repositories/user/in-memory-users-repository'

let urlsRepository: InMemoryURLsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchUserURLsUseCase

let userId: string

describe('fetch user urls use case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryURLsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUserURLsUseCase(urlsRepository, usersRepository)

    userId = await usersRepository.create({
      email: 'email',
      name: 'name',
      passwordHash: 'hash',
    })
  })

  it('should be able to fetch user urls', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('URL not found.')

    const result = await sut.execute({ userId: url.userId })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Array<URL>)
    expect(result.value[0]).toBeInstanceOf(URL)
  })

  it('should not be able to fetch urls by a non-existent user id', async () => {
    const result = await sut.execute({ userId: 'non-existent-user-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
