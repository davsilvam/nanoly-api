import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/link/in-memory-links-repository'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { Link } from '../../entities/link'
import { UpdateLinkUseCase } from './update-link'

let linksRepository: InMemoryLinksRepository
let sut: UpdateLinkUseCase

describe('update Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new UpdateLinkUseCase(linksRepository)
  })

  it('should be able to update a link by id', async () => {
    const linkId = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linksRepository.findById(linkId)

    if (!link)
      throw new Error('Link not found.')

    const result = await sut.execute({
      id: link.id,
      longUrl: 'https://www.google.com.br',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeUndefined()

    const updatedLink = await linksRepository.findById(linkId)

    expect(updatedLink).toBeInstanceOf(Link)
    expect(updatedLink?.longUrl).toBe('https://www.google.com.br')
  })

  it('should not be able to update a link by a non-existent id', async () => {
    const result = await sut.execute({
      id: 'non-existent-id',
      longUrl: 'https://www.google.com.br',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkNotFoundError)
  })
})
