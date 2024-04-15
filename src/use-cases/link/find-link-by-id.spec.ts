import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { Link } from '../../entities/link'
import { FindLinkByIdUseCase } from './find-link-by-id'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'

let linksRepository: InMemoryLinkRepository
let sut: FindLinkByIdUseCase

describe('Find Link By Id Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinkRepository()
    sut = new FindLinkByIdUseCase(linksRepository)
  })

  it('should be able to get a link by id', async () => {
    const { linkId } = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linksRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    const response = await sut.execute({ id: link.id })

    expect(response.isRight()).toBe(true)
    expect(response.value).toBeInstanceOf(Link)
  })

  it('should not be able to get a link by a non-existent id', async () => {
    const response = await sut.execute({ id: 'non-existent-id' })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(LinkNotFoundError)
  })
})
