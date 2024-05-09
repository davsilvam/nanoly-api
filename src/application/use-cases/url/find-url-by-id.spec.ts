import { randomUUID } from 'node:crypto'

import { beforeEach, describe, expect, it } from 'vitest'

import { UrlNotFoundError } from './errors/url-not-found.error'
import { FindUrlByIdUseCase } from './find-url-by-id'
import { UnauthorizedUserError } from '../user/errors/unauthorized-user.error'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

import { User } from '@/domain/entities/user.entity'
import { InMemoryUrlsRepository } from '@/infra/database/in-memory/repositories/in-memory-urls-repository'
import { InMemoryUsersRepository } from '@/infra/database/in-memory/repositories/in-memory-users-repository'

let urlsRepository: InMemoryUrlsRepository
let usersRepository: InMemoryUsersRepository
let sut: FindUrlByIdUseCase

let userId: string

describe('find url by id use case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FindUrlByIdUseCase(urlsRepository, usersRepository)

    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      passwordHash: 'password',
    })

    await usersRepository.create(user)

    userId = user.id
  })

  it('should be able to get a url by id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const url = await urlsRepository.findById(urlId)

    if (!url)
      throw new Error('Url not found.')

    const result = await sut.execute({ id: url.id, userId })

    expect(result.isRight()).toBe(true)
    expect(result.isRight() && result.value).toStrictEqual(url)
  })

  it('should not be able to get a url by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id', userId })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UrlNotFoundError)
  })

  it('should not be able to get a url by a non-existent user id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const result = await sut.execute({ id: urlId, userId: 'non-existent-user-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to get a url by an unauthorized user', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'another-user-id',
    })

    const result = await sut.execute({ id: urlId, userId })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UnauthorizedUserError)
  })
})
