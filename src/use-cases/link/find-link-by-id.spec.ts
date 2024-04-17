import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { Link } from '../../entities/link'
import { FindLinkByIdUseCase } from './find-link-by-id'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'

let linkRepository: InMemoryLinkRepository
let sut: FindLinkByIdUseCase

describe('Find Link By Id Use Case', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository()
    sut = new FindLinkByIdUseCase(linkRepository)
  })

  it('should be able to get a link by id', async () => {
    const linkId = await linkRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linkRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    const result = await sut.execute({ id: link.id })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeInstanceOf(Link)
  })

  it('should not be able to get a link by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkNotFoundError)
  })
})
