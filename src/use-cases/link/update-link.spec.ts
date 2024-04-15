import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinkRepository } from '../../repositories/link/in-memory-link-repository'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { UpdateLinkUseCase } from './update-link'
import { Link } from '../../entities/link'

let linksRepository: InMemoryLinkRepository
let sut: UpdateLinkUseCase

describe('Update Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinkRepository()
    sut = new UpdateLinkUseCase(linksRepository)
  })

  it('should be able to update a link by id', async () => {
    const { linkId } = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const link = await linksRepository.findById(linkId)

    if (!link) {
      throw new Error('Link not found.')
    }

    const response = await sut.execute({
      id: link.id,
      longUrl: 'https://www.google.com.br',
    })

    expect(response.isRight()).toBe(true)
    expect(response.value).toBeUndefined()

    const updatedLink = await linksRepository.findById(linkId)

    expect(updatedLink).toBeInstanceOf(Link)
    expect(updatedLink?.longUrl).toBe('https://www.google.com.br')
  })

  it('should not be able to update a link by a non-existent id', async () => {
    const response = await sut.execute({
      id: 'non-existent-id',
      longUrl: 'https://www.google.com.br',
    })

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(LinkNotFoundError)
  })
})
