import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { Link } from '../../entities/link'
import { FetchLinksByUserUseCase } from './fetch-links-by-user'
import { InMemoryUserRepository } from '../../repositories/user/in-memory-user-repository'
import { UserNotFoundError } from '../../errors/user/user-not-found.error'

let linkRepository: InMemoryLinkRepository
let userRepository: InMemoryUserRepository
let sut: FetchLinksByUserUseCase

let userId: string

describe('Fetch Links By User Id Use Case', () => {
  beforeEach(async () => {
    linkRepository = new InMemoryLinkRepository()
    userRepository = new InMemoryUserRepository()
    sut = new FetchLinksByUserUseCase(linkRepository, userRepository)

    userId = await userRepository.create({
      email: 'email',
      name: 'name',
      passwordHash: 'hash',
    })
  })

  it('should be able to fetch links by user id', async () => {
    const linkId = await linkRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId,
    })

    const link = await linkRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

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
