import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryLinksRepository } from '../../repositories/link/in-memory-links-repository'
import { LinkNotFoundError } from '../../errors/link/link-not-found.error'
import { DeleteLinkUseCase } from './delete-link'

let linksRepository: InMemoryLinksRepository
let sut: DeleteLinkUseCase

describe('delete Link Use Case', () => {
  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new DeleteLinkUseCase(linksRepository)
  })

  it('should be able to delete a link by id', async () => {
    const linkId = await linksRepository.create({
      longUrl: 'https://www.google.com',
      shortUrl: 'google',
      userId: 'user-id',
    })

    const result = await sut.execute({ id: linkId })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a link by a non-existent id', async () => {
    const result = await sut.execute({ id: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkNotFoundError)
  })
})
