import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/link/in-memory-links-repository'
import { Link } from '../../entities/link'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { FindLinkByIdUseCase } from './find-link-by-id'

let linksRepository: InMemoryLinksRepository
let sut: FindLinkByIdUseCase

describe('find Link By Id Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new FindLinkByIdUseCase(linksRepository)
  })

  it('should be able to get a link by id', async () => {
    const linkId = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linksRepository.findById(linkId)

    if (!link)
      throw new Error('Link not found.')

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
