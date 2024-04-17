import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { UpdateLinkUseCase } from './update-link'
import { Link } from '../../entities/link'

let linkRepository: InMemoryLinkRepository
let sut: UpdateLinkUseCase

describe('Update Link Use Case', () => {
  beforeEach(() => {
    linkRepository = new InMemoryLinkRepository()
    sut = new UpdateLinkUseCase(linkRepository)
  })

  it('should be able to update a link by id', async () => {
    const linkId = await linkRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linkRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    const result = await sut.execute({
      id: link.id,
      longUrl: 'https://www.google.com.br',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeUndefined()

    const updatedLink = await linkRepository.findById(linkId)

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
