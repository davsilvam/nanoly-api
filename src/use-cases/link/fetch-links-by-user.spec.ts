import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/link/in-memory-links-repository'
import { Link } from '../../entities/link'
import { InMemoryUsersRepository } from '../../repositories/user/in-memory-users-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'
import { FetchLinksByUserUseCase } from './fetch-links-by-user'

let linksRepository: InMemoryLinksRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchLinksByUserUseCase

let userId: string

describe('fetch Links By User Id Use Case', () => {
  beforeEach(async () => {
    linksRepository = new InMemoryLinksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchLinksByUserUseCase(linksRepository, usersRepository)

    userId = await usersRepository.create({
      email: 'email',
      name: 'name',
      passwordHash: 'hash',
    })
  })

  it('should be able to fetch links by user id', async () => {
    const linkId = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const link = await linksRepository.findById(linkId)

    if (!link)
      throw new Error('Link not found.')

    const result = await sut.execute({ userId: link.userId })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Array)
    expect(result.value[0]).toBeInstanceOf(Link)
  })

  it('should not be able to fetch links by a non-existent user id', async () => {
    const result = await sut.execute({ userId: 'non-existent-user-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
