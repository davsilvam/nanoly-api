import { beforeEach, describe, expect, it } from 'vitest'

import { DeleteUrlUseCase } from './delete-url'
import { UrlNotFoundError } from './errors/url-not-found.error'
import { InMemoryUrlsRepository } from '../../../infra/repositories/in-memory/in-memory-urls-repository'
import { InMemoryUsersRepository } from '../../../infra/repositories/in-memory/in-memory-users-repository'
import { UnauthorizedUserError } from '../user/errors/unauthorized-user.error'
import { UserNotFoundError } from '../user/errors/user-not-found.error'

let urlsRepository: InMemoryUrlsRepository
let usersRepository: InMemoryUsersRepository
let sut: DeleteUrlUseCase

let userId: string

describe('delete url use case', () => {
  beforeEach(async () => {
    urlsRepository = new InMemoryUrlsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUrlUseCase(urlsRepository, usersRepository)

    userId = await usersRepository.create({
      name: 'name',
      email: 'email',
      passwordHash: 'password-hash',
    })
  })

  it('should be able to delete a url by id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const result = await sut.execute({ id: urlId, userId })

    expect(result.isRight()).toBe(true)
    expect(await urlsRepository.findById(urlId)).toBeNull()
  })

  it('should not be able to delete a url by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id', userId })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UrlNotFoundError)
  })

  it('should not be able to delete a url by a non-existent user id', async () => {
    const urlId = await urlsRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const result = await sut.execute({ id: urlId, userId: 'non-existent-user-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.isLeft() && result.value).toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to delete a url by an unauthorized user', async () => {
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
