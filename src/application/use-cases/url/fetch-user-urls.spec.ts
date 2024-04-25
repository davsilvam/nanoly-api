import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUserUrlsUseCase } from './fetch-user-urls'
import type { UrlProps } from '../../../domain/entities/url'
import { InMemoryUrlsRepository } from '../../../infra/repositories/in-memory/in-memory-urls-repository'
import { InMemoryUsersRepository } from '../../../infra/repositories/in-memory/in-memory-users-repository'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

let urlsRepository: InMemoryUrlsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchUserUrlsUseCase

let userId: string

describe('fetch user urls use case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUserUrlsUseCase(urlsRepository, usersRepository)

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
      throw new Error('Url not found.')

    const result = await sut.execute({ userId: url.userId })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toBeInstanceOf(Array<UrlProps>)
    expect(result.isRight() && result.value[0]).toStrictEqual(url)
  })

  it('should not be able to fetch urls by a non-existent user id', async () => {
    const result = await sut.execute({ userId: 'non-existent-user-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UserNotFoundError)
  })
})
