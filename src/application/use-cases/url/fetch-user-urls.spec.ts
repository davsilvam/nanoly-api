import { beforeEach, describe, expect, it } from 'vitest'

import { FetchUserUrlsUseCase } from './fetch-user-urls'
import { Url } from '../../../domain/entities/url.entity'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

import { User } from '@/domain/entities/user.entity'
import { InMemoryUrlsRepository } from '@/infra/database/in-memory/repositories/in-memory-urls-repository'
import { InMemoryUsersRepository } from '@/infra/database/in-memory/repositories/in-memory-users-repository'

let urlsRepository: InMemoryUrlsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchUserUrlsUseCase

let userId: string

describe('fetch user urls use case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUserUrlsUseCase(urlsRepository, usersRepository)

    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash: 'password',
    })

    await usersRepository.create(user)

    userId = user.id
  })

  it('should be able to fetch user urls', async () => {
    const url = Url.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    await urlsRepository.create(url)

    const result = await sut.execute({ userId: url.userId, page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toBeInstanceOf(Array<Url>)
    expect(result.isRight() && result.value[0]).toStrictEqual(url)
  })

  it('should not be able to fetch urls by a non-existent user id', async () => {
    const result = await sut.execute({ userId: 'non-existent-user-id', page: 1 })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UserNotFoundError)
  })
})
