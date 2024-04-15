import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { Link } from '../../entities/link'
import { FetchLinksByUserUseCase } from './fetch-links-by-user'

let linksRepository: InMemoryLinkRepository
let sut: FetchLinksByUserUseCase

describe('Fetch Links By User Id Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinkRepository()
    sut = new FetchLinksByUserUseCase(linksRepository)
  })

  it('should be able to fetch links by user id', async () => {
    const { linkId } = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linksRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    const response = await sut.execute({ userId: link.userId })

    expect(response.isRight()).toBe(true)
    expect(response.value).toBeInstanceOf(Array)
    expect(response.value[0]).toBeInstanceOf(Link)
  })

  it('should not be able to fetch links by a non-existent user id', async () => {
    const response = await sut.execute({ userId: 'non-existent-user-id' })

    expect(response.isRight()).toBe(true)
    expect(response.value).toBeInstanceOf(Array)
    expect(response.isRight() && response.value.length).toBe(0)
  })
})
